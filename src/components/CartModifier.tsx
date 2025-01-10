import { useCart } from "@contexts/CartContext";
import { Product } from "@models/product";

export const CartModifier = ({product}: {product: Product}) => {
    const {get, addItem, removeItem} = useCart();

    const item = get(product.id);
    const count = item ? item.quantity : 0;

    const increment = () => {
        addItem(product)
    }

    const decrement = () => {
        removeItem(product.id)
    }
    return (<>
    <button onClick={() => decrement()}>remove</button>
    {count}
    <button onClick={() => increment()}>add</button>
    </>)
}