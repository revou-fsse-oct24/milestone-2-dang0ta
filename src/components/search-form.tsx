'use client';
import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from "@/components/ui/sidebar";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {

    const router = useRouter();
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

    const onChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        router.push(
            "products?" + createQueryString("title", value)
        );
    }, 300);

    return (
        <form {...props}>
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <SidebarInput
                        onChange={onChange}
                        id="search"
                        placeholder="Search products..."
                        className="pl-8"
                    />
                    <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    );
}
