import { useCart } from "@/contexts/cart-context";
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { ShoppingCartIcon } from "lucide-react";
import { RollingNumber } from "./rolling-number";

export default function CartSidebar() {
  const {count} = useCart();
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href="/cart">
          <ShoppingCartIcon className="text-muted-foreground" />
          Cart
        </a>
      </SidebarMenuButton>
      <SidebarMenuBadge>
        <RollingNumber value={count()} />{" "}
        <span className="ml-1 text-muted-foreground font-semibold text-sm">
          {" "}
          item{count() > 1 ? "s" : ""}
        </span>
      </SidebarMenuBadge>
    </SidebarMenuItem>
  );
}
