"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/forrmaters";
import { Checkbox } from "../ui/checkbox";
import { Product } from "@prisma/client";
import { Size } from "@prisma/client";
import { Extra } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCartItem, removeCartItem, removeItemFromCart, selectCartItems } from "@/redux/features/cart/cartSlice";
import { getItemQuantity } from "@/lib/cart";

const AddToCartButton = ({ item }: { item: ProductWithRelations }) => {
  const cart = useAppSelector(selectCartItems);
  const quantity = getItemQuantity(item.id, cart);
  const dispatch = useAppDispatch();
  const defaultSize =
    cart.find((element) => element.id === item.id)?.size ||
    item.sizes.find((size) => size.name === "SMALL");
  const defaultExtra =
    cart.find((element) => element.id === item.id)?.extras || [];
  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);
  const [selectedExtra, setSelectedExtra] = useState<Extra[]>(defaultExtra!);
  let TotalPrice = item.basePrice;
  if (selectedSize) {
    TotalPrice += selectedSize.price;
  }
  if (selectedExtra.length > 0) {
    for (const extra of selectedExtra) {
      TotalPrice += extra.price;
    }
  }
  const handelAddToCart = () => {
    dispatch(
      addCartItem({
        basePrice: item.basePrice,
        id: item.id,
        image: item.image,
        name: item.name,
        size: selectedSize,
        extras: selectedExtra,
      })
    );
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            size={"lg"}
            className="mt-4 text-white rounded-full !px-8"
          >
            Add To Cart
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex items-center">
            <Image src={item.image} alt={item.name} width={200} height={200} />
            <DialogTitle>{item.name}</DialogTitle>
            <DialogDescription className="text-center">
              {item.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-10">
            <div className="space-y-4 text-center">
              <Label htmlFor="pick-size">Pick your size</Label>
              <PickSize
                sizes={item.sizes}
                item={item}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            </div>
            <div className="space-y-4 text-center">
              <Label htmlFor="add-Extras">Any Extras</Label>
              <Extras
                extras={item.extras}
                selectedExtra={selectedExtra}
                setSelectedExtra={setSelectedExtra}
              />
            </div>
          </div>
          <DialogFooter>
            {quantity === 0 ? (
              <Button
                onClick={handelAddToCart}
                className="w-full h-10"
                type="submit"
              >
                Add to Cart {formatCurrency(TotalPrice)}
              </Button>
            ) : (
              <ChooseQuantity quantity={quantity} selectedExtras={selectedExtra} selectedSize={selectedSize} item={item} />
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddToCartButton;

function PickSize({
  sizes,
  item,
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  item: ProductWithRelations;
  selectedSize: Size;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size) => {
        return (
          <div
            key={size.id}
            className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
          >
            <RadioGroupItem
              value={selectedSize.name}
              checked={selectedSize.id === size.id}
              onClick={() => setSelectedSize(size)}
              id={size.id}
            />
            <Label htmlFor={size.id}>
              {size.name}
              {formatCurrency(size.price + item.basePrice)}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
function Extras({
  extras,
  selectedExtra,
  setSelectedExtra,
}: {
  extras: Extra[];
  selectedExtra: Extra[];
  setSelectedExtra: React.Dispatch<React.SetStateAction<Extra[]>>;
}) {
  return extras.map((extra) => {
    const handelExtra = (extra: Extra) => {
      if (selectedExtra.find((e) => e.id === extra.id)) {
        const filteredSelectedExtra = selectedExtra.filter(
          (item) => item.id !== extra.id
        );
        setSelectedExtra(filteredSelectedExtra);
      } else {
        setSelectedExtra((prev) => [...prev, extra]);
      }
    };
    return (
      <div
        key={extra.id}
        className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
      >
        <Checkbox
          checked={Boolean(selectedExtra.find((e) => e.id === extra.id))}
          onClick={() => handelExtra(extra)}
          id={extra.id}
        />
        <Label
          htmlFor={extra.id}
          className="text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {extra.name}
          {formatCurrency(extra.price)}
        </Label>
      </div>
    );
  });
}

const ChooseQuantity = ({
  quantity,
  item,
  selectedExtras,
  selectedSize,
}: {
  quantity: number;
  selectedExtras: Extra[];
  selectedSize: Size;
  item: ProductWithRelations;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center flex-col gap-2 mt-4 w-full">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
        >
          -
        </Button>
        <div>
          <span className="text-black">{quantity} in cart</span>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            dispatch(
              addCartItem({
                basePrice: item.basePrice,
                id: item.id,
                image: item.image,
                name: item.name,
                extras: selectedExtras,
                size: selectedSize,
              })
            )
          }
        >
          +
        </Button>
      </div>
      <Button
        size="sm"
        onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
      >
        Remove
      </Button>
    </div>
  );
};
