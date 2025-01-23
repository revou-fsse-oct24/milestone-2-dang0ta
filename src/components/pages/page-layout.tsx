"use client";

import { MainSidebar } from "@/components/main-sidebar";

import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import MainContainer from "@/components/main-container";
import { BreadcrumbProvider } from "@/contexts/breadcrumb-context";
import { MainBreadcrumb } from "@/components/main-breadcrumb";
import { UserSidebar } from "@/components/pages/navigation/user-sidebar";

// disable SSR on both of these providers, since they rely on localStorage, which can't be pre-rendered by the Next.js server
const CartProvider = dynamic(() => import("@/contexts/cart-context"), { ssr: false });
const FavoriteProvider = dynamic(() => import("@/contexts/favorite-context"), { ssr: false });

const PageLayout = ({ children }: { children: ReactNode; }) => {
    return (
        <Providers>
            <MainSidebar footer={<UserSidebar />} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <MainBreadcrumb />
                </header>
                <MainContainer>{children}</MainContainer>
            </SidebarInset>
        </Providers>
    );
};

// combine all providers into one
const Providers = ({ children }: { children: ReactNode; }) => {
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


export default PageLayout;