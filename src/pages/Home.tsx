import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CartModifier } from "@/components/CartModifier";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { useHomeData } from "@/hooks/useHomeData";
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
    <div className="flex flex-col gap-4">
        <h2 className="font-bold text-lg">Categories</h2>
        <div className="flex flex-row space-x-4 p-4">
          {state.categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`}>
              <CategoryCard category={category} />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-[83vw]">
        <h2 className="font-bold text-lg">Recently Purchased</h2>
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {state.products.map((product) => (
              <div key={product.id} className="flex flex-col items-start">
                <Link to={`/product/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
                <CartModifier product={product} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      
    </>
  );
};

export default Home;
