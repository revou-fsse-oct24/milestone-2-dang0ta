import { BreadcrumbSetter } from "@/components/main-breadcrumb";
import { ProductWithCart } from "@/components/product-with-cart";
import { ScrollBar } from "@/components/ui/scroll-area";
import { useFavorite } from "@/contexts/favorite-context";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Head from "next/head";

const Page = () => {
    const { list } = useFavorite();
    const products = list();

    if (products.length === 0) {
        return (
            <>
                <Head>
                    <title>Favorites | ShopMart</title>
                </Head>
                    <div className="flex flex-col gap-4 max-w-[83vw]">
                        <BreadcrumbSetter items={[{ label: "Favorites", href: "/shop/favorites" }]} />
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
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Favorites | ShopMart</title>
            </Head>
                <div className="flex flex-col gap-4 max-w-[83vw]">
                    <BreadcrumbSetter items={[{ label: "Favorites", href: "/shop/favorites" }]} />
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
            </>
    );
};

export default Page;