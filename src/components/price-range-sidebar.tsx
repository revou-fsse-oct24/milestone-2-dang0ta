'use client';

import { cn } from "@/lib/utils";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "./ui/sidebar";
import { Slider } from '@/components/ui/slider';
import { Input } from "./ui/input";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from 'nextjs-toploader/app';
import { useDebouncedCallback } from "use-debounce";

export const PriceRangeSidebar = ({ className }: { className?: string; }) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [value, setValue] = useState<number[]>([10, 900]);

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = (value?: number[]) => {
        const params = new URLSearchParams(searchParams?.toString());
        console.log({ value });
        if (value) {
            params.set("price_min", `${value[0]}`);
            params.set("price_max", `${value[1]}`);
        } else {
            params.delete("price_min");
            params.delete("price_max");
        }

        return params.toString();
    };


    const updateValue = useDebouncedCallback((value: number[]) => {
        console.log({ value });
        setValue(value);
        router.push(pathname + "?" + createQueryString(value));
    }, 300);

    return (
        <SidebarGroup key="price_range">
            <SidebarGroupLabel><span className="uppercase font-medium text-xs text-muted-foreground">price range</span></SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-2">
                            <Input type="number" placeholder="price min." className="flex-1" value={value[0]} onChange={(e) => {
                                if (!e.target.value || Number.isNaN(e.target.value)) {
                                    return;
                                }
                                const n = Number.parseInt(e.target.value);

                                value[0] = n;
                                updateValue([...value]);
                            }} />
                            <Input type="number" placeholder="price max." className="flex-1" value={value[1]} onChange={(e) => {
                                if (!e.target.value || Number.isNaN(e.target.value)) {
                                    return;
                                }

                                const n = Number.parseInt(e.target.value);

                                value[1] = n;
                                updateValue([...value]);
                            }} />
                        </div>
                        <Slider
                            defaultValue={value}
                            max={1000}
                            step={10}
                            className={cn("w-full px-2", className)}
                            onValueChange={value => updateValue(value)}
                        />
                    </div>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};