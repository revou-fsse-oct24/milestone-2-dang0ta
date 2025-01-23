"use client"

import { SidebarProvider } from "@/components/ui/sidebar";
import { BreadcrumbProvider } from "@/contexts/breadcrumb-context";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

// disable SSR on both of these providers, since they rely on localStorage, which can't be pre-rendered by the Next.js server
const CartProvider = dynamic(() => import("@/contexts/cart-context"), { ssr: false });
const FavoriteProvider = dynamic(() => import("@/contexts/favorite-context"), { ssr: false });

// combine all providers into one
export const Providers = ({ children }: { children: ReactNode; }) => {
    return (
        <FavoriteProvider>
            <CartProvider>
                <SidebarProvider>
                    <BreadcrumbProvider>
                        {children}
                    </BreadcrumbProvider>
                </SidebarProvider>
            </CartProvider>
        </FavoriteProvider>
    );
};
