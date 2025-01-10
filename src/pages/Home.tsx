import { CartModifier } from "@components/CartModifier";
import CategoryCard from "@components/CategoryCard";
import ProductCard from "@components/ProductCard";
import { useHomeData } from "@hooks/useHomeData";
import { Link } from "react-router-dom";

/**
 * Home component that fetches and displays products and categories.
 */
const Home = () => {
  const { data: state } = useHomeData();

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
        <div className="flex flex-row flex-nowrap overflow-x-scroll whitespace-nowrap">
          {state.products.map((product) => (
            <div key={product.id} className="flex flex-col items-start">
            <Link  to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
            <CartModifier product={product} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Categories</h2>
        <div className="flex flex-row flex-nowrap overflow-x-scroll whitespace-nowrap">
          {state.categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`}>
              <CategoryCard category={category} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
