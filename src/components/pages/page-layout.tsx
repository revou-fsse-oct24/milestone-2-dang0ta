import { MainSidebar } from "@/components/main-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import MainContainer from "@/components/main-container";
import { MainBreadcrumb } from "@/components/main-breadcrumb";
import { UserSidebar } from "@/components/pages/navigation/user-sidebar";

const PageLayout = ({ children }: { children: ReactNode; }) => {
    return (
        <>
            <MainSidebar footer={<UserSidebar />} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <MainBreadcrumb />
                </header>
                <MainContainer>{children}</MainContainer>
            </SidebarInset>
        </>
    );
};

export default PageLayout;