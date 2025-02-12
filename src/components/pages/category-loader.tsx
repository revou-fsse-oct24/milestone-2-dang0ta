import { ProductsQuery, queryProductsURL } from "@/actions/api";
import { queryProductsFetcher } from "@/actions/products";
import { Category } from "@/models/category";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ProductWithCart } from "@/components/pages/product-with-cart";
import useSWR from "swr";
import CategorySkeleton from "../category-skeleton";
import { ParsedUrlQuery } from "querystring";

interface CategoryLoaderProps {
    category: Category;
    query?: ParsedUrlQuery;
    className?: string;
}

export function CategoryLoader({ category, query: params, className }: Readonly<CategoryLoaderProps>) {
    const query: ProductsQuery = {
        category: `${category.id}`,
    };

    const title = params?.title as string;
    if (title) {
        query.title = title;
    }

    const price_min = params?.price_min as string;
    const price_max = params?.price_max as string;
    if (price_min || price_max) {
        const min = price_min && !Number.isNaN(price_min) ? Number.parseInt(price_min) : 0;
        const max = price_max && !Number.isNaN(price_max) ? Number.parseInt(price_max) : 1000;
        query.priceRange = [min, max];
    }

    const { data, isLoading, error } = useSWR(queryProductsURL(query), () => queryProductsFetcher(query));

    if (error) {
        return (
            <div className={cn(className, "text-red-500")}>
                <h3 className="text-xl font-bold leading-none capitalize">
                    {category.name}
                </h3>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    if (isLoading) {
        return <CategorySkeleton />;
    }

    if (!data || data.length === 0) {
        return (
            <div className={cn(className)}>
                <h3 className="text-xl font-bold leading-none capitalize">
                    {category.name}
                </h3>
                <ScrollArea>
                    <div className="flex flex-col items-start space-y-4 py-4 h-[200px]">
                        <span className="text-muted-foreground">There aren&apos;t any products in this category</span>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        );
    }

    return (
        <div className={cn(className, "flex flex-col gap-4 w-full")} data-testid="category">
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
}

export default CategoryLoader;