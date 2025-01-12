'use client';

import { useState, createContext, useContext, useMemo } from "react";

export type BreadcrumbItemProps = {
    label: string
    href: string;
}

type BreadcrumbContextProps = {
    items: BreadcrumbItemProps[];
    setItems: (items: BreadcrumbItemProps[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextProps>({items: [], setItems: () => {}});

export const BreadcrumbProvider = ({children}: {children: React.ReactNode}) => {
    const [items, setItems] = useState<BreadcrumbItemProps[]>([]);

    const value = useMemo(() => ({ items, setItems }), [items]);

    return (
        <BreadcrumbContext.Provider value={value}>
            {children}
        </BreadcrumbContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBreadcrumb = () => useContext(BreadcrumbContext);