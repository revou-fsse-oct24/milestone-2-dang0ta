import { getCategories } from "@/actions/categories";
import CategoryLoader from "@/components/category-loader";
import CategorySkeleton from "@/components/category-skeleton";
import { FilterBanners } from "@/components/filter-banners";
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
                    fallback={<CategorySkeleton />}
                >
                    <CategoryLoader category={category} searchParams={searchParams} />
                </Suspense>
            ))}
        </>
    );
}



