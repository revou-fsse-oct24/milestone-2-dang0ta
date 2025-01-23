import { ProductsQuery } from "@/actions/api";
import { getCategory } from "@/actions/categories";
import { queryProducts } from "@/actions/products";
import { BreadcrumbSetter } from "@/components/main-breadcrumb";
import PageLayout from "@/components/pages/page-layout";
import { ProductWithCart } from "@/components/pages/product-with-cart";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BreadcrumbItemProps } from "@/contexts/breadcrumb-context";
import { Category, defaultCategory } from "@/models/category";
import { Product } from "@/models/product";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

type Props = {
    category: Category;
    products: Product[];
    error: string | null;
    breadcrumbs: BreadcrumbItemProps[];
};

const getProps = async (query: ProductsQuery): Promise<Props> => {

    const [products, category] = await Promise.all([queryProducts(query), getCategory({ id: query.category! })]);
    if (products.status == "error") {
        return { category: defaultCategory(), products: [], error: products.error ?? "something went wrong", breadcrumbs: [] };
    }

    if (category.status == "error") {
        return { category: defaultCategory(), products: [], error: category.error ?? "something went wrong", breadcrumbs: [] };
    }

    const breadcrumbs: BreadcrumbItemProps[] = [
        { label: "Products", href: "/products" },
        { label: category.data.name, href: `/product?category=${category.data.id}` },
    ];

    return { category: category.data, products: products.data, error: null, breadcrumbs };
};

const parseContext = (context: GetServerSidePropsContext): ProductsQuery => {
    const p = context.query;

    const query: ProductsQuery = {
        offset: p["offset"] ? Number.parseInt(p["offset"] as string) : 0,
        limit: p["limit"] ? Number.parseInt(p["offset"] as string) : 10,
        category: p["category"] as string,
    };
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

    return p;
};

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps = (async (context) => {
    const query = parseContext(context);
    if (!query.category) {
        return { props: { products: [], category: defaultCategory(), error: "no category selected", breadcrumbs: [] } };
    }

    const props = await getProps(query);

    props.breadcrumbs = [
        { label: "Products", href: "/products" },
        { label: props.category.name, href: `/product?category=${props.category.id}` },
    ];

    return { props };
}) satisfies GetServerSideProps<Props>;

export default function Page({ products: data, category, error, breadcrumbs: items }: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
    if (error) {
        return <PageLayout><div>Error: {error}</div></PageLayout>;
    }

    if (data.length === 0) {
        return (
            <PageLayout>
                <div>
                    <BreadcrumbSetter items={items} />
                    <ScrollArea>
                        <div className="flex space-x-4 pb-4 h-[200px]">
                            <span>no product in this category</span>
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className="flex flex-col gap-4">
                <BreadcrumbSetter items={items} />
                <h3>{category.name}</h3>
                <ScrollArea>
                    <div className="flex flex-row gap-4 pb-4 flex-wrap">
                        {data.map((product: Product) => (
                            <ProductWithCart key={product.id} product={product} />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </PageLayout>
    );

}