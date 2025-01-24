import { getProduct } from "@/actions/products";
import { CartModifier } from "@/components/cart-modifier";
import { BreadcrumbSetter } from "@/components/main-breadcrumb";
import CategoryLoader from "@/components/pages/category-loader";
import PageLayout from "@/components/pages/page-layout";
import { ProductImages } from "@/components/product-images";
import { Separator } from "@/components/ui/separator";
import { defaultProduct, Product } from "@/models/product";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type Props = {
    product: Product;
    error?: string;
};

export const getServerSideProps = (async (context) => {
    const { status, data, error } = await getProduct({ id: context.query.id as string });
    if (status == "error") {
        return { props: { product: defaultProduct(), error } };
    }

    return { props: { product: data } };

}) satisfies GetServerSideProps<Props>;

export default function Page({ product: data, error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (error) {
        return <PageLayout><div>Error: {error}</div></PageLayout>;
    }
    return (
        <PageLayout>
            <div className="flex flex-col gap-8">
                <BreadcrumbSetter items={[{ label: "Products", href: "/products" }, { label: data.title, href: `/product/${data.id}}` }]} />
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

                <CategoryLoader category={data.category} />
            </div>
        </PageLayout>
    );

}