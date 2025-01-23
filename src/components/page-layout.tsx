"use client";

import { MainSidebar } from "@/components/main-sidebar";

import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import MainContainer from "./main-container";
import { MainBreadcrumb } from "./main-breadcrumb";
import { NavUser } from "./user-sidebar";
import { Providers } from "@/providers/global.provider";



const PageLayout = ({ children }: { children: ReactNode; }) => {
    return (
        <Providers>
            <MainSidebar footer={<NavUser />} />
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
export default PageLayout;