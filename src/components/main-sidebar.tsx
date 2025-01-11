import * as React from "react";

import { SearchForm } from "@/components/search-form";
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
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { getCategories } from "@/actions/categories";
import { Category } from "@/models/category";
import { useResponse } from "@/hooks/useResponse";
import { useCart } from "@/contexts/cart-context";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = React.useCallback(
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
    return null;
    // return <Navigate to="/" />;
  }

  return (
    <SidebarGroup key="categories">
      <SidebarGroupLabel>Categories</SidebarGroupLabel>
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
