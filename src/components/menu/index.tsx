import { ProductWithRelations } from "@/types/product";
import MenuItem from "./MenuItem";

const Menu = ({ items }: { items: ProductWithRelations[] }) => {

  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">No products found</p>
  );
};

export default Menu;
