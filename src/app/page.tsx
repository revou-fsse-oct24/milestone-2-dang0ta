import { getCategories } from "@/actions/categories";
import { queryProducts } from "@/actions/products";
import { ProductWithCart } from "@/components/product-with-cart";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Category } from "@/models/category";
import { Suspense } from "react";

export default async function Page() {
  const { status, data, error } = await getCategories();

  if (status == "error") {
    return <>Error: {error}</>;
  }

  return (
    <>
      {data.map((category) => (
        <Suspense
          key={category.id}
          fallback={<div>loading products on category {category.name} ...</div>}
        >
          <CategoryLoader category={category} />
        </Suspense>
      ))}
    </>
  );
}

const CategoryLoader = async ({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) => {
  const { status, data, error } = await queryProducts({
    category: `${category.id}`,
  });
  if (status == "error") {
    return <>Error: {error}</>;
  }

  if (data.length === 0) {
    return (
      <div className={cn(className)}>
        <h3 className="text-xl font-bold leading-none capitalize">
          {category.name}
        </h3>
        <ScrollArea>
          <div className="flex space-x-4 pb-4 h-[200px]">
            <span>no product in this category</span>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className={cn(className, "flex flex-col gap-4 max-w-[83vw]")}>
      <h3 className="text-xl font-bold leading-none capitalize">
        {category.name}
      </h3>
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {data.map((product) => (
            <ProductWithCart key={product.id} product={product} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
