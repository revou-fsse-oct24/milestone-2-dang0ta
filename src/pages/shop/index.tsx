import { getCategoriesFetcher } from "@/actions/categories";
import CategoryLoader from "@/components/pages/category-loader";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Category } from "@/models/category";
import { parseError } from "@/actions/exceptions";

import { useRouter } from 'nextjs-toploader/app';
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { createQueryFilterItems } from "@/lib/queryFilters";
import FilterChip from "@/components/filter-chips";
import { getCategory } from "@/lib/urlSearchParams";

type Props = {
    categories: Category[];
    queryFilters: { key: string, label: string; }[];
    resolvedURL: string;
    query?: ParsedUrlQuery;
    error?: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps = (async (context) => {
    const items = createQueryFilterItems(context.query);
    try {
        const categories = await getCategoriesFetcher();
        const category = getCategory(context.query);
        const categoryData = category ? categories.find((c) => c.id === category) : undefined;
        if (categoryData) {
            items.push({ key: "category", label: `category: ${categoryData.name}` });
            return { props: { categories: [categoryData], queryFilters: items, resolvedURL: context.resolvedUrl, query: context.query } };
        }

        return {
            props: { categories, queryFilters: items, resolvedURL: context.resolvedUrl, query: context.query }
        };

    } catch (e) {
        const parsedErr = parseError(e);
        return { props: { categories: [], error: parsedErr.message, queryFilters: items, resolvedURL: context.resolvedUrl, query: context.query } };
    }
}) satisfies GetServerSideProps<Props>;

function Page({ categories, queryFilters, error, resolvedURL, query }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const router = useRouter();

    const removeFilterChip = (key: string) => {
        const searchParams = new URLSearchParams(resolvedURL.split("?")[1]);
        searchParams.delete(key);
        if (Array.from(searchParams).length) {
            router.push(`/shop?${searchParams.toString()}`);
        } else {
            router.push("/shop");
        }
    };

    if (error) {
        return (<div data-testid="error">Error: {error}</div>);
    }

    return (
        <>
            <Head>
                <title>ShopMart!</title>
            </Head>
            <div data-testid="banners" className="flex flex-row gap-2">
                {queryFilters.map((item) => <div key={item.key} data-testid={`banner-${item.key}`} ><FilterChip label={item.label} onRemove={() => removeFilterChip(item.key)} /></div>)}
            </div>
            {categories.map((category) => <CategoryLoader  key={category.id} category={category} query={query} />)}
        </>
    );
}

export default Page;