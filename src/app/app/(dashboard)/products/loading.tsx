import CategorySkeleton from "@/components/category-skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-8 py-0">
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
        </div>
    );
}