'use client';
import { ProductWithCart } from "@/components/product-with-cart";
import { ScrollBar } from "@/components/ui/scroll-area";
import { useFavorite } from "@/contexts/favorite-context";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const Page = ({ className }: {
    className?: string;
}) => {
    const { list } = useFavorite();
    const products = list();

    if (products.length === 0) {
        return (
            <div className={cn(className)}>
                <h3 className="text-xl font-bold leading-none capitalize">
                    Favorites
                </h3>
                <ScrollArea>
                    <div className="flex space-x-4 py-4 h-[200px]">
                        <span className="text-muted-foreground font-medium">there&apos;s nothing here</span>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        );
    }

    return (
        <div className={cn(className, "flex flex-col gap-4 max-w-[83vw]")}>
            <h3 className="text-xl font-bold leading-none capitalize">
                Favorites
            </h3>
            <ScrollArea>
                <div className="flex space-x-4 pb-4">
                    {products.map((product) => (
                        <ProductWithCart key={product.id} product={product} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
};

export default Page;