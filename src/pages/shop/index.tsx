import { getCategoriesFetcher } from "@/actions/categories";
import CategoryLoader from "@/components/pages/category-loader";
import PageLayout from "@/components/pages/page-layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Category } from "@/models/category";
import { parseError } from "@/actions/exceptions";
import { ReactElement } from "react";
import { ParsedUrlQuery } from "querystring";
import { CircleXIcon } from "lucide-react";
import { useRouter } from 'nextjs-toploader/app';

type Props = {
    categories: Category[];
    banners: { key: string, label: string; }[];
    resolvedURL: string;
    query?: ParsedUrlQuery;
    error?: string;
};

const createBanners = (searchParams: ParsedUrlQuery): { key: string, label: string; }[] => {
    const banners: { key: string, label: string; }[] = [];
    const title = searchParams.title;
    if (title) {
        banners.push({ key: "title", label: `title: ${title}` });
    }

    const price_min = searchParams.price_min;
    if (price_min) {
        banners.push({ key: "price_min", label: `price min. USD${price_min}.00` });
    }

    const price_max = searchParams.price_max;
    if (price_max) {
        banners.push({ key: "price_max", label: `price max. USD${price_max}.00` });
    }

    return banners;
};



const Banner = ({ label, onRemove }: { label: string, onRemove: () => void; }) => {
    return (
        <button className="flex items-center  gap-2 justify-between p-2 bg-gray-200 rounded-sm border group cursor-pointer hover:bg-gray-300 transition-colors" onClick={() => onRemove()}>
            <span className="text-gray-400 text-xs group-hover:text-gray-500 transition-colors">{label}</span>
            <CircleXIcon size={12} className="text-gray-400 cursor-pointer group-hover:text-gray-500 transition-colors" />
        </button>
    );
};

export const getServerSideProps = (async (context) => {
    const banners = createBanners(context.query);
    try {
        const categories = await getCategoriesFetcher();
        if(context.query.category && !Number.isNaN(Number.parseInt(context.query.category as string))) {
            const category = categories.find((c) => c.id === Number.parseInt(context.query.category as string));
            if (category) {
                banners.push({ key: "category", label: `category: ${category.name}` });
                return {props: { categories: [category], banners: banners, resolvedURL: context.resolvedUrl, query: context.query }}
            }
        }
        return {
            props: { categories, banners: banners, resolvedURL: context.resolvedUrl, query: context.query }
        };
    } catch (e) {
        const parsedErr = parseError(e);
        return { props: { categories: [], error: parsedErr.message, banners: banners, resolvedURL: context.resolvedUrl, query: context.query } };
    }
}) satisfies GetServerSideProps<Props>;

function Page({ categories, banners, error, resolvedURL, query }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const router = useRouter();

    const removeBanner = (key: string) => {
        const searchParams = new URLSearchParams(resolvedURL.split("?")[1]);
        searchParams.delete(key);
        if (searchParams.size) {
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
            <div data-testid="banners" className="flex flex-row gap-2">
                {banners.map((banner) => <div key={banner.key} data-testid={`banner-${banner.key}`} ><Banner label={banner.label} onRemove={() => removeBanner(banner.key)} /></div>)}
            </div>
            {categories.map((category) => <CategoryLoader key={category.id} category={category} query={query} />)}
        </>
    );
}

Page.getLayout = function getLayout(page: ReactElement) {
    return <PageLayout>{page}</PageLayout>;
};

export default Page;