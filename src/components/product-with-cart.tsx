'use client';

import { Product } from "@/models/product";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { CartModifier } from "@/components/CartModifier";

export const ProductWithCart = ({ product }: { product: Product }) => {
  return (
    <div key={product.id} className="flex flex-col items-start">
      <Link href={`/product/${product.id}`}>
        <ProductCard product={product} />
      </Link>
      <CartModifier product={product} />
    </div>
  );
};
