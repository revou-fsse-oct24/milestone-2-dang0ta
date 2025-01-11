import ProductCard from "@/components/product-card";
import { CartModifier } from "@/components/cart-modifier";
import { Product } from "@/models/product";
import { ProductsQuery } from "@/actions/api";
import { queryProducts } from "@/actions/products";
import Link from "next/link";

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
        <div className="flex flex-row items-start">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col">
          <h1 className="text-lg font-medium text-muted-foreground">No product in this category :(</h1>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="flex flex-row items-start">
      <div className="grid grid-cols-3 gap-2">
        {data.map((product: Product) => (
          <div key={product.id} className="flex flex-col">
            <Link href={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
            <CartModifier product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
