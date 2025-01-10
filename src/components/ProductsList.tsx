import { useProductQuery } from "@/hooks/useProductQuery";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { cn } from "@utils/cn";
import { CartModifier } from "./CartModifier";

const ProductsList = ({ className }: { className?: string }) => {
  const [searchParams] = useSearchParams();
  const { state, query, setQuery } = useProductQuery({
    category: searchParams.get("category") || undefined,
  });

  useEffect(() => {
    setQuery({
      ...query,
      category: searchParams.get("category") || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, setQuery]);

  if (state.status == "init") {
    return <>init state</>;
  }

  if (state.status == "loading") {
    return <>loading...</>;
  }

  return (
    <div className={cn(className, "grid grid-cols-3 gap-2")}>
      {state.response?.data.map((product) => (
        <div key={product.id} className="flex flex-col">
          <Link to={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
          <CartModifier product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
