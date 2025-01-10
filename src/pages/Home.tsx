import ProductCard from "@components/ProductCard";
import { useHomeData } from "@hooks/useHomeData";

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
        {state.products.map((product) => <ProductCard key={product.id} product={product} className="min-w-md" />)}
        </div>
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
