import PageLayout from "@/components/page-layout";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode})  {
    return(
        <PageLayout>{children}</PageLayout>
    )
}