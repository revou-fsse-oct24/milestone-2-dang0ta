'use client';
import { SearchForm } from "@/components/search-form";
import {
    GalleryVerticalEnd,
    SpeakerIcon,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import CategorySidebar from "./category-sidebar";
import CartSidebar from "./cart-sidebar";
import { FavoriteSidebar } from "./favorite-sidebar";
import { PriceRangeSidebar } from "./price-range-sidebar";

// TODO: replace with real data
const data = {
    user: {
        name: "test",
        email: "test@gmail.com",
        avatar: "string",
    },
};

export function MainSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <GalleryVerticalEnd className="size-4" />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="font-semibold">ShopMart</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SearchForm />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel><span className="uppercase font-medium text-xs text-muted-foreground">products</span></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/">
                                        <SpeakerIcon className="text-muted-foreground" />
                                        All Products
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <FavoriteSidebar />
                            <CartSidebar />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <CategorySidebar />
                <PriceRangeSidebar />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}



