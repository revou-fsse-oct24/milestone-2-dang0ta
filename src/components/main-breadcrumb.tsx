'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItemProps, useBreadcrumb } from "@/contexts/breadcrumb-context";
import { useEffect } from "react";

export const MainBreadcrumb = () => {
    const { items } = useBreadcrumb();
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {items.map((item, index) => {
                    const key = `${item.label}-${index}`;
                    if (index === items.length - 1) {
                        return (
                            <div key={key} className="flex flex-row items-center gap-2">
                                <BreadcrumbSeparator  className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </div>
                        );
                    }

                    return (
                        <div  key={key} className="flex flex-row items-center gap-2">
                        <BreadcrumbSeparator  className="hidden md:block" />
                        <BreadcrumbItem >
                            <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export const BreadcrumbSetter = ({ items }: { items: BreadcrumbItemProps[]; }) => {
    const { setItems } = useBreadcrumb();
    useEffect(() => {
        setItems(items);
    }, [])
    return <></>;
};