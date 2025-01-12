import { Skeleton } from "./ui/skeleton";

const CategorySkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="h-9 w-[250px]" />
            <div className="flex flex-row gap-4">
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[350px] w-[350px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[350px] w-[350px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[350px] w-[350px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[350px] w-[350px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CategorySkeleton;