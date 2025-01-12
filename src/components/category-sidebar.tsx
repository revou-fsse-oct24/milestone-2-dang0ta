import { getCategories } from "@/actions/categories";
import { useResponse } from "@/hooks/use-response";
import { Category } from "@/models/category";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Loader2Icon, Package2Icon } from "lucide-react";

export default function CategorySidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams?.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    const { state, response } = useResponse<Category[]>(getCategories);

    const isSelected = (id: string): boolean =>
        searchParams?.get("category") ? searchParams.get("category") === id : false;

    if (state === "loading" || state === "init") {
        return (
            <SidebarGroup key="categories">
                <SidebarGroupLabel><span className="uppercase font-medium text-xs text-muted-foreground">categories</span></SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <button className="text-muted-foreground cursor-default" disabled>
                                    loading category list...
                                </button>
                            </SidebarMenuButton>
                            <SidebarMenuBadge>
                                <Loader2Icon
                                    size={12}
                                    className="text-muted-foreground animate-spin"
                                />
                            </SidebarMenuBadge>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        );
    }

    if (!response) {
        return null;
    }

    return (
        <SidebarGroup key="categories">
            <SidebarGroupLabel><span className="uppercase font-medium text-xs text-muted-foreground">categories</span></SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {response.data.map((item: Category) => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton
                                asChild
                                isActive={isSelected(`${item.id}`)}
                                onClick={() =>
                                    router.push(
                                        pathname + "?" + createQueryString("category", `${item.id}`)
                                    )
                                }
                            >

                                <a href={`/products?category=${item.id}`}><Package2Icon className="text-muted-foreground" />{item.name}</a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}