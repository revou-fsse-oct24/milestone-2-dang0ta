import { getProduct } from "@/actions/products";
import { CartModifier } from "@/components/cart-modifier";
import CategoryLoader from "@/components/category-loader";
import CategorySkeleton from "@/components/category-skeleton";
import { ProductImages } from "@/components/product-images";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

const Page = async ({
    params,
    searchParams,
}: {
    params: Promise<{ id: string; }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined; }>;
}) => {
    const { status, data, error } = await getProduct({ id: (await params).id });

    if (status == "error") {
        return <>error {error}</>;
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="gap-4 flex flex-row items-start">
                <ProductImages images={data.images} />
                <div className="flex flex-col justify-between">
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
                            <p className="text-sm text-muted-foreground mb-4">{data.description}</p>
                            <p className="font-medium text-lg mb-4">USD {data.price}.00</p>
                            <CartModifier product={data} />
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            <Suspense fallback={<CategorySkeleton />}>
                <CategoryLoader category={data.category} searchParams={searchParams} />
            </Suspense>
        </div>
    );
};

export default Page;

