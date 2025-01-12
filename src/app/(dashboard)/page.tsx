import { ProductsQuery } from "@/actions/api";
import { getCategories } from "@/actions/categories";
import { queryProducts } from "@/actions/products";
import { FilterBanners } from "@/components/filter-banners";
import { ProductWithCart } from "@/components/product-with-cart";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Category } from "@/models/category";
import { Suspense } from "react";

export default async function Page({ searchParams }: { readonly searchParams?: Promise<{ readonly [key: string]: string | string[] | undefined; }>; }) {

    const { status, data, error } = await getCategories();

    if (status == "error") {
        return <>Error: {error}</>;
    }

    return (
        <>
            <FilterBanners />
            {data.map((category) => (
                <Suspense
                    key={category.id}
                    fallback={<div>loading products on category {category.name} ...</div>}
                >
                    <CategoryLoader category={category} searchParams={searchParams} />
                </Suspense>
            ))}
        </>
    );
}

const CategoryLoader = async ({
    category,
    className,
    searchParams,
}: {
    category: Category;
    className?: string;
    readonly searchParams?: Promise<{ readonly [key: string]: string | string[] | undefined; }>;
}) => {

    const params = (await searchParams) || {};
    const query: ProductsQuery = {
        category: `${category.id}`,
    };

    const title = params["title"] as string;
    if (title) {
        query.title = title;
    }

    const price_min = params["price_min"] as string;
    const price_max = params["price_max"] as string;
    if (price_min || price_max) {
        const min = price_min && !Number.isNaN(price_min) ? Number.parseInt(price_min) : 0;
        const max = price_max && !Number.isNaN(price_max) ? Number.parseInt(price_max) : 1000;
        query.priceRange = [min, max];
    }

    const { status, data, error } = await queryProducts(query);

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
