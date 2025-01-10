import { CartModifier } from "@components/CartModifier";
import { ImageLoader } from "@components/ImageLoader";
import { useCart } from "@contexts/CartContext";

const Cart = () => {
  const { items, total } = useCart();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 border-b mb-4 p-4">
        {Object.keys(items).map((id) => {
          const item = items[Number.parseInt(id)];
          return (
            <div className="flex flex-row gap-2">
              <ImageLoader
                src={item.product.mainImage}
                width={96}
                height={96}
              />
              <div className="flex-1 flex flex-col h-full">
                <h3 className="flex-1 font-semibold mb-2">
                  {item.product.title}
                </h3>
                <p className="text-sm text-slate-100">
                  {item.product.category.name}
                </p>
                <p className="inline-block text-sm text-slate-100 justify-self-end">
                  {item.product.price}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="text-xl font-bold">
                  {item.quantity * item.product.price}
                </span>
                <CartModifier product={item.product} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row items-end w-full justify-end">
        Total : {total()}
      </div>

      <div className="flex flex-row items-end w-full justify-end">
        <button>checkout</button>
      </div>
    </div>
  );
};

export default Cart;
