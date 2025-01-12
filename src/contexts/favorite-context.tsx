'use client';

import { Product } from "@/models/product";
import { useContext, createContext, useMemo, useState } from "react";

type Favorite = {
    items: Record<number, Product>;
    add: (product: Product) => void;
    remove: (productId: number) => void;
    list: () => Product[];
    isFavorite: (productId: number) => boolean;
    total: () => number;
};

const FavoriteContext = createContext<Favorite>({
    items: {},
    add: () => { },
    remove: () => { },
    list: () => [],
    isFavorite: () => false,
    total: () => 0,
});

const FavoriteProvider = ({ children }: { children: React.ReactNode; }) => {

    const persist = () => {
        if (!localStorage) {
            return;
        }

        localStorage.setItem("favorite", JSON.stringify(items));
    };

    const loadPersisted = () => {
        if (!localStorage) {
            return {};
        }

        return JSON.parse(localStorage.getItem("favorite") || "{}") as Record<number, Product>;
    };

    const [items, setItems] = useState<Record<number, Product>>(loadPersisted());


    const value = useMemo(() => ({
        items: {},
        add: (product: Product) => {
            items[product.id] = product;
            setItems({ ...items });
            persist();
        },
        remove: (productID: number) => {
            delete items[productID];
            setItems({ ...items });
            persist();
        },
        list: () => [...Object.values(items)],
        isFavorite: (productId: number) => !!items[productId],
        total: () => [...Object.values(items)].length,
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [items]);

    return (
        <FavoriteContext.Provider value={value}>
            {children}
        </FavoriteContext.Provider>);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorite = () => useContext(FavoriteContext);
export default FavoriteProvider;