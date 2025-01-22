import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";
import { formatCurrency } from "@/lib/forrmaters";
import Image from "next/image";

const BestSellers = () => {
  const bestSellers = [
    {
      id: crypto.randomUUID(),
      name: "Pizza 1",
      description: "this pizaa is fucking nice",
      basePrise: 10,
      image: "/assets/images/pizza.png",
    },
    {
      id: crypto.randomUUID(),
      name: "Pizza 1",
      description: "this pizaa is fucking nice",
      basePrise: 10,
      image: "/assets/images/pizza.png",
    },
    {
      id: crypto.randomUUID(),
      name: "Pizza 1",
      description: "this pizaa is fucking nice",
      basePrise: 10,
      image: "/assets/images/pizza.png",
    },
    {
      id: crypto.randomUUID(),
      name: "Pizza 1",
      description: "this pizaa is fucking nice",
      basePrise: 10,
      image: "/assets/images/pizza.png",
    },
    {
      id: crypto.randomUUID(),
      name: "Pizza 1",
      description: "this pizaa is fucking nice",
      basePrise: 10,
      image: "/assets/images/pizza.png",
    },
  ];
  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading title={"CheckOut"} subTitle={"Our Best Sellers"} />
        </div>
        <Menu items={bestSellers} />
      </div>
    </section>
  );
};

export default BestSellers;
