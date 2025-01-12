import { ReactNode } from "react";
import { useSidebar } from "./ui/sidebar";
import { cn } from "@/lib/utils";

const MainContainer = ({ children }: { children: ReactNode; }) => {
    const { open } = useSidebar();
    return <div className={cn("flex flex-1 flex-col gap-4 p-8 overflow-hidden", open ? "max-w-[85vw]" : "max-w-[100vw]")}>{children}</div>;
};

export default MainContainer;