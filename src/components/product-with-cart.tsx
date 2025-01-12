'use client';

import { Product } from "@/models/product";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { CartModifier } from "@/components/cart-modifier";
import { FavoriteModifier } from "./favorite-modifier";

export const ProductWithCart = ({ product }: { product: Product; }) => {
    return (
        <div key={product.id} className="flex flex-col items-start">
            <Link href={`/product/${product.id}`}>
                <ProductCard product={product} />
            </Link>
            <div className="flex flex-row justify-between w-full items-center">
                <CartModifier product={product} />
                <FavoriteModifier product={product} />
            </div>
        </div>
    );
};
