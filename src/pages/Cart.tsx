import { useCart } from "@contexts/CartContext";

const Cart = () => {
    const {total} = useCart();
  return (
    <div>{total()}</div>
  )
}

export default Cart