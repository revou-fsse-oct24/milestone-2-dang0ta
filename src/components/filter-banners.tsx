'use client';

import { CircleXIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useRouter } from 'nextjs-toploader/app';

export const FilterBanners = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams?.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            return params.toString();
        },
        [searchParams]
    );

    const banners = useCallback((): { label: string, onRemove: () => void; }[] => {
        const banners = [];
        const category = searchParams.get("category");
        if (category) {
            banners.push({
                label: `category: ${category}`,
                onRemove: () => {
                    router.push(pathname + "?" + createQueryString("category", ""));
                }
            });
        }

        const title = searchParams.get("title");
        if (title) {
            banners.push({
                label: `title: ${title}`,
                onRemove: () => {
                    router.push(pathname + "?" + createQueryString("title", ""));
                }
            });
        }

        const price_min = searchParams.get("price_min");
        if (price_min) {
            banners.push({
                label: `price min. USD${price_min}.00`,
                onRemove: () => {
                    router.push(pathname + "?" + createQueryString("price_min", ""));
                }
            });
        }

        const price_max = searchParams.get("price_max");
        if (price_max) {
            banners.push({
                label: `price max. USD${price_max}.00`,
                onRemove: () => {
                    router.push(pathname + "?" + createQueryString("price_max", ""));
                }
            });
        }

        return banners;
    }, [searchParams]);

    return (
        <div className="flex flex-row gap-2">
            {banners().map((banner) => <Banner key={banner.label} label={banner.label} onRemove={banner.onRemove} />)}
        </div>
    );
};

const Banner = ({ label, onRemove }: { label: string, onRemove: () => void; }) => {
    return (
        <div className="flex items-center  gap-2 justify-between p-2 bg-gray-200 rounded-sm border group cursor-pointer hover:bg-gray-300 transition-colors">
            <span className="text-gray-400 text-xs group-hover:text-gray-500 transition-colors">{label}</span>
            <CircleXIcon size={12} className="text-gray-400 cursor-pointer group-hover:text-gray-500 transition-colors" onClick={() => onRemove()} />
        </div>
    );
};