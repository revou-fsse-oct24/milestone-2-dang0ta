import { useCart } from "@/contexts/cart-context";
import { Product } from "@/models/product";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-row  gap-2 w-fit justify-start items-center p-2 border rounded-lg">
      <Button variant="secondary" size="icon" onClick={() => decrement()}>
        <MinusCircleIcon size={16} />
      </Button>
      <span className="inline-block text-lg font-semibold min-w-4 text-center">{count}</span>
      <Button variant="secondary" size="icon" onClick={() => increment()}>
        <PlusCircleIcon size={16} />
      </Button>
    </div>
  );
};
