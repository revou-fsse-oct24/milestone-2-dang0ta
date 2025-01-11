import { Button } from "@/components/ui/button";
import { CartModifier } from "@/components/cart-modifier";
import { ImageLoader } from "@/components/image-loader";
import { useCart } from "@/contexts/cart-context";
import { CreditCardIcon } from "lucide-react";

const Cart = () => {
  const { items, total } = useCart();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row items-end w-full justify-end gap-4">
        <span className="text-3xl font-bold">USD {total()}.00</span>
        <Button variant="default" size="lg">
          <span className="font-semibold text-lg">Checkout</span>
          <CreditCardIcon size={32} className="ml-2 w-12 h-12" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 border-b mb-4 py-4">
        {Object.keys(items).map((id) => {
          const item = items[Number.parseInt(id)];
          return (
            <div className="flex flex-row gap-4 p-2 border rounded-md">
              <ImageLoader
                src={item.product.mainImage}
                width={96}
                height={96}
              />
              <div className="flex-1 flex flex-col h-full">
                <h3 className="flex-1 font-semibold mb-2 leading-8">
                  {item.product.title}
                </h3>
                <p className="text-sm rounded-md bg-muted w-fit px-1 py-0 text-muted-foreground inline-block my-2">
                  {item.product.category.name}
                </p>
                <p className="inline-block text-sm font-semibold justify-self-end">
                  USD {item.product.price}.00
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="text-xl font-bold">
                  USD {item.quantity * item.product.price}.00
                </span>
                <CartModifier product={item.product} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
