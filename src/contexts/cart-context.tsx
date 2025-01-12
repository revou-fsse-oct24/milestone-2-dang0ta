"use client";

import { Product } from "@/models/product";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type CartItem = {
  product: Product;
  quantity: number;
};

type Cart = {
  items: Record<number, CartItem>;
  get: (productId: number) => CartItem | null;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  total: () => number;
  count: () => number;
  allItems: () => CartItem[];
  clear: () => void;
};

const CartContext = createContext<Cart>({
  items: {},
  get: () => null,
  addItem: () => {},
  removeItem: () => {},
  total: () => 0,
  count: () => 0,
  allItems: () => [],
  clear: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const persistCart = (items: Record<number, CartItem>) => {
    if (!localStorage) {
      return;
    }

    localStorage.setItem("cart", JSON.stringify(items));
  };

  const loadPersistedCart = (): Record<number, CartItem> => {
    if (!localStorage) {
      return {};
    }

    return JSON.parse(localStorage.getItem("cart") || "{}") as Record<
      number,
      CartItem
    >;
  };

  const [items, setItems] = useState<Record<number, CartItem>>(
    loadPersistedCart()
  );
  
  const addItem = (product: Product) => {
    const existing = items[product.id];
    if (existing) {
      existing.quantity++;
      items[product.id] = existing;
    } else {
      items[product.id] = { product, quantity: 1 };
    }

    setItems({ ...items });
    persistCart(items);
  };

  const removeItem = (productId: number) => {
    const existing = items[productId];
    if (existing) {
      if (existing.quantity == 1) {
        delete items[productId];
      } else {
        existing.quantity--;
        items[productId] = existing;
      }
    }

    setItems({ ...items });
    persistCart(items);
  };

  const total = (): number => {
    return [...Object.keys(items)].reduce((acc, cur) => {
      const keyn = Number(cur);
      if (Number.isNaN(keyn)) {
        return acc;
      }

      const item = items[keyn];

      acc += item.quantity * (item.product.price || 0);
      return acc;
    }, 0);
  };

  const count = () => {
    const _items = [...Object.entries(items)];
    if (_items.length === 0) {
      return 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return _items.reduce((acc, [_, item]) => acc + item.quantity, 0);
  };

  const get = (productId: number): CartItem | null => {
    return items[productId];
  };

  const allItems = (): CartItem[] => [...Object.values(items)];

  const clear = () => {
    setItems({});
    localStorage.removeItem("cart");
  };

  const value = useMemo(() => ({
    items,
    addItem,
    removeItem,
    total,
    count,
    get,
    allItems,
    clear,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [items]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export default CartProvider;
