import { getProduct } from "@actions/products";
import { useResponse } from "@hooks/useResponse";
import { Product } from "@models/product";
import { Navigate, useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const { state, response } = useResponse<Product>(async () => {
    if (!id) {
      return {
        status: "error",
        data: Product.default(),
        error: "No Product ID provided",
      };
    }

    return getProduct({ id }); // Fetch the product data
  });

  if (state == "loading" || state == "init") {
    return <>loading product...</>; // Show loading state
  }

  if (!response) {
    return <Navigate to="/" />; // Redirect to home if no response
  }

  if (response.status == "error") {
    return <>Error: {response.error}</>; // Show error message
  }

  const product = response.data; // Extract product data from response
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default ProductPage;
