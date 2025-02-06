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
import { StoreIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const PageLayout = ({ children }: { children: ReactNode; }) => {
    return (
        <>
            <MainSidebar footer={<UserSidebar />} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <MainBreadcrumb />
                    </div>
                    <Link href="about-us"><Button size="sm" variant="ghost">about us <StoreIcon /></Button></Link>
                </header>
                <MainContainer>{children}</MainContainer>
            </SidebarInset>
        </>
    );
};

export default PageLayout;