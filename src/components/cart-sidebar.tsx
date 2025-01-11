import { useCart } from "@/contexts/cart-context";
import { SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { ShoppingCartIcon } from "lucide-react";

export default function CartSidebar() {
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
  