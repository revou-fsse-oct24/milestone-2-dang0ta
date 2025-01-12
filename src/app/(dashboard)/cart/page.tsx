"use client";

import { Button } from "@/components/ui/button";
import { CartModifier } from "@/components/cart-modifier";
import { useCart } from "@/contexts/cart-context";
import { CreditCardIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { getMainImage } from "@/models/product";
import Link from "next/link";

const Cart = () => {
  const { allItems, total, count, clear } = useCart();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row items-end w-full justify-between align-baseline">
        <div className="flex flex-row gap-2 items-baseline">
          <h2 className="text-2xl font-semibold">
            {count()} item{count() > 1 ? "s" : ""}
          </h2>
          <Button variant="ghost" onClick={() => clear()}>
            <span className="text-muted-foreground">clear all</span>
            <Trash2Icon className="text-muted-foreground" size={24} />
          </Button>
        </div>
        <div className="flex flex-row gap-4 items-end">
          <span className="text-3xl font-bold">USD {total()}.00</span>
          <Button variant="default" size="lg">
            <span className="font-semibold text-lg">Checkout</span>
            <CreditCardIcon size={32} className="ml-2 w-12 h-12" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-4 py-4">
        {allItems().map((item) => {
          return (
            <div className="flex flex-row gap-4 p-2 border rounded-md">
              <Link className="w-full" key={item.product.id} href={`/product/${item.product.id}`}>
                <div className="flex flex-row gap-4 items-center w-full">
                  <Image
                    alt={item.product.title}
                    src={getMainImage(item.product)}
                    width={96}
                    height={96}
                  />
                  <div className="flex-1 flex flex-col h-full">
                    <h3 className="flex-1 font-semibold mb-2 leading-8">
                      {item.product.title}
                    </h3>
                    <p className="text-sm rounded-md bg-muted w-fit px-1 py-0 text-muted-foreground inline-block my-2">
                      {item.product.category.name}
                    </p>
                    <p className="inline-block text-sm font-semibold justify-self-end">
                      USD {item.product.price}.00
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex flex-col items-end justify-between">
                <span className="text-xl font-bold leading-10">
                  USD {item.quantity * item.product.price}.00
                </span>
                <CartModifier product={item.product} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
