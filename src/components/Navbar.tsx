import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
        <ul className="flex flex-row gap-2 w-full p-4">
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/products">Store</Link>
            </li>
            <li>
            <Link to="/cart">Cart</Link>
            </li>
        </ul>
        </nav>
    );
}

export default Navbar;