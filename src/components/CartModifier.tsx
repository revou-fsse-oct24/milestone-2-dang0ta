import { useCart } from "@contexts/CartContext";
import { Product } from "@models/product";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";

export const CartModifier = ({ product }: { product: Product }) => {
  const { get, addItem, removeItem } = useCart();

  const item = get(product.id);
  const count = item ? item.quantity : 0;

  const increment = () => {
    addItem(product);
  };

  const decrement = () => {
    removeItem(product.id);
  };
  return (
    <div className="flex flex-row gap-2 items-center">
      <button onClick={() => decrement()}>
        <MinusCircleIcon size={16} />
      </button>
      {count}
      <button onClick={() => increment()}>
        <PlusCircleIcon size={16} />
      </button>
    </div>
  );
};
