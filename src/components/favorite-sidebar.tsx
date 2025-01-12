'use client';
import { StarIcon } from "lucide-react";
import { SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useFavorite } from "@/contexts/favorite-context";
import { RollingNumber } from "./rolling-number";

export const FavoriteSidebar = () => {
    const { total } = useFavorite();
    const count = total();

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <a href="/favorites">
                    <StarIcon className="text-muted-foreground" />
                    Favorites
                </a>
            </SidebarMenuButton>
            <SidebarMenuBadge>
                <RollingNumber value={count} />{" "}
                <span className="ml-1 text-muted-foreground font-semibold text-sm">
                    {" "}
                    item{count > 1 ? "s" : ""}
                </span>
            </SidebarMenuBadge>
        </SidebarMenuItem>
    );
};