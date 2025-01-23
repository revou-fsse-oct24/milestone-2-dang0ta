import { getCategoriesURL } from "@/actions/api";
import { getCategoriesFetcher } from "@/actions/categories";
import CategoryLoader from "@/components/pages/category-loader";
import CategorySkeleton from "@/components/category-skeleton";
import { FilterBanners } from "@/components/filter-banners";
import useSWR from "swr";
import PageLayout from "@/components/pages/page-layout";

export default function Page() {
    const { data, error, isLoading } = useSWR(getCategoriesURL(), getCategoriesFetcher);

    if (isLoading || !data) {
        return (
            <PageLayout>
                <div className="flex flex-col gap-8 py-0">
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
            </div>
            </PageLayout>
        );
    }

    if (error) {
        return <PageLayout>
            <>Error: {error}</>
        </PageLayout>;
    }

    return (
        <PageLayout>
            <FilterBanners />
            {data.map((category) => <CategoryLoader key={category.id} category={category} />)}
        </PageLayout>
    );
}



