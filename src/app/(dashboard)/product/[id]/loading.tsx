import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="p-8 gap-4 flex flex-row">
            <div className="flex flex-col gap-4">
                <Skeleton className="h-[400px] w-[400px] rounded-xl" />
                <div className="flex flex-row gap-2">
                    <Skeleton className="h-[120px] w-[120px] rounded-xl" />
                    <Skeleton className="h-[120px] w-[120px] rounded-xl" />
                    <Skeleton className="h-[120px] w-[120px] rounded-xl" />
                </div>
            </div>

            <div className="flex flex-col justify-between h-[400px]">
                <div className="flex-1">
                    <Skeleton className="h-8 w-[250px] mb-4" />
                    <Skeleton className="h-6 w-[800px] mb-2" />
                    <Skeleton className="h-6 w-[800px] mb-2" />
                    <Skeleton className="h-6 w-[800px] mb-2" />
                    <Skeleton className="h-6 w-[600px] mb-2" />
                </div>

                <Skeleton className="h-8 w-[240px]" />
            </div>
        </div>
    );
}