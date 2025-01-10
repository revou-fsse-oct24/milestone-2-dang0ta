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
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2>Categories</h2>
        {state.categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  );
};

export default Home;
