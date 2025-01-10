import { useProductQuery } from "@hooks/useCategory";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { cn } from "@utils/cn";

const ProductsList = ({className}: {className?: string}) => {
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
        <Link key={product.id} to={`/product/${product.id}`}>
        <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductsList;
