import { ProductsQuery } from "@/actions/api";
import { queryProducts } from "@/actions/products";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ProductWithCart } from "@/components/product-with-cart";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const p = (await searchParams) || {};
  const query: ProductsQuery = {
    offset: p["offset"] ? Number.parseInt(p["offset"] as string) : 0,
    limit: p["limit"] ? Number.parseInt(p["offset"] as string) : 10,
  };

  if (p["category"]) {
    query.category = p["category"] as string;
  }

  if (p["title"]) {
    query.title = p["title"] as string;
  }

  if (p["price"]) {
    query.price = Number.parseInt(p["price"] as string);
  }

  if (p["price_min"] && p["price_max"]) {
    query.priceRange = [
      Number.parseInt(p["price_min"] as string),
      Number.parseInt(p["price_max"] as string),
    ];
  }

  const { status, data, error } = await queryProducts(query);
  if (status == "error") {
    return <>error {error}</>;
  }

  if (data.length === 0) {
    return (
      <div>
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
    <div className="flex flex-col gap-4 max-w-[83vw]">
      <ScrollArea>
        <div className="grid gap-4 grid-cols-[repeat(3,350px)]">
          {data.map((product) => (
            <ProductWithCart key={product.id} product={product} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Page;
