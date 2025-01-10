import * as React from "react";

import { SearchForm } from "@components/search-form";
import {
  GalleryVerticalEnd,
  Loader2Icon,
  ShoppingCartIcon,
  SpeakerIcon,
  StarIcon,
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Navigate, useSearchParams } from "react-router-dom";
import { getCategories } from "@/actions/categories";
import { Category } from "@/models/category";
import { useResponse } from "@/hooks/useResponse";
import { useCart } from "@/contexts/CartContext";

// This is sample data.
const data = {
  user: {
    name: "test",
    email: "test@gmail.com",
    avatar: "string",
  },
  navMain: [
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "All Products",
          url: "/products",
          isActive: true,
        },
        {
          title: "Favourites",
          url: "/favourites",
        },
        {
          title: "Cart",
          url: "/cart",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
          <SidebarGroupLabel>Products</SidebarGroupLabel>
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

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <StarIcon className="text-muted-foreground" />
                    Favourites
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <CartSidebar />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <CategorySidebar />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function CategorySidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, response } = useResponse<Category[]>(getCategories);

  const isSelected = (id: string): boolean =>
    searchParams.get("category") ? searchParams.get("category") === id : false;

  if (state === "loading" || state === "init") {
    return (
      <SidebarGroup key="categories">
        <SidebarGroupLabel>Categories</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="text-muted-foreground">
                  loading category list...
                </a>
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
    return <Navigate to="/" />;
  }

  return (
    <SidebarGroup key="categories">
      <SidebarGroupLabel>Categories</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {response.data.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                isActive={isSelected(`${item.id}`)}
                onClick={() => setSearchParams({ category: item.id + "" })}
              >
                <a href={`/products?category=${item.id}`}>{item.name}</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function CartSidebar() {
  const cart = useCart();
  const count = cart.count();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href="/cart">
          <ShoppingCartIcon className="text-muted-foreground" />
          Cart
        </a>
      </SidebarMenuButton>
      <SidebarMenuBadge>
        <span className="text-muted-foreground font-semibold">
          {count} item{count > 1 ? "s" : ""}
        </span>
      </SidebarMenuBadge>
    </SidebarMenuItem>
  );
}
