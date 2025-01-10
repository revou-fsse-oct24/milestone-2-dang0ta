import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "@pages/Home";
import Products from "@pages/Products";
import Cart from "@pages/Cart";
import NotFound from "@pages/404";
import Product from "@pages/Product";
import { Provider } from "@contexts/CartContext";
import LoginPage from "@pages/Login";
import RegisterPage from "./pages/Register";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
