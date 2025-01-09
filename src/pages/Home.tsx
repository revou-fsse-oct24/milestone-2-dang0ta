import { useEffect, useState } from "react";
import { getProducts, Product } from "../../lib/product";
import { getCategories, Category } from "../../lib/category";
import { Response } from "../../lib/api";
import { parseError } from "../../lib/exceptions";

// Define the state type for the Home component
type State = {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error?: string;
};

/**
 * Home component that fetches and displays products and categories.
 */
const Home = () => {
  const [state, setState] = useState<State>({
    products: [],
    categories: [],
    loading: false,
    error: "",
  });

  /**
   * Fetches products and categories data from the API.
   */
  const fetchData = async () => {
    setState({
      ...state,
      loading: true,
    });
    try {
      const promises: [
        Promise<Response<Category[]>>,
        Promise<Response<Product[]>>
      ] = [getCategories(), getProducts({})];
      const [categoriesRes, productsRes] = await Promise.all(promises);
      if (categoriesRes.status === "error") {
        throw new Error(categoriesRes.error);
      }

      if (productsRes.status === "error") {
        throw new Error(productsRes.error);
      }

      setState({
        ...state,
        loading: false,
        products: productsRes.data,
        categories: categoriesRes.data,
      });
    } catch (e) {
      const parsedErr = parseError(e);
      setState({
        ...state,
        loading: false,
        error: parsedErr.message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (state.loading) {
    return <>loading products ... </>;
  }

  if (state.error) {
    return <>Error: {state.error}</>;
  }

  return (
    <>
      <div>
        <h2>Top 10 products</h2>
        {state.products.map((product) => (
          <h3 key={product.id}>{product.title}</h3>
        ))}
      </div>

      <div>
        <h2>Categories</h2>
        {state.categories.map((category) => (
          <h3 key={category.id}>{category.name}</h3>
        ))}
      </div>
    </>
  );
};

export default Home;
