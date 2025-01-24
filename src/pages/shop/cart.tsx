import { CartModifier } from "@/components/cart-modifier";
import { BreadcrumbSetter } from "@/components/main-breadcrumb";
import PageLayout from "@/components/pages/page-layout";
import { Button } from "@/components/ui/button";
import { CartItem, useCart } from "@/contexts/cart-context";
import { Category } from "@/models/category";
import { getMainImage } from "@/models/product";
import { CreditCardIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    const { allItems, total, count, clear } = useCart();

    return (
        <PageLayout>
            <div className="flex flex-col gap-4 p-4">
                <BreadcrumbSetter items={[{ label: "Cart", href: "/cart" }]} />
                <div className="flex flex-row items-end w-full justify-between align-baseline">
                    <CartHeader count={count()} clear={clear} />
                    <CartAction total={total()} />
                </div>
                <div className="flex flex-col gap-4 mb-4 py-4">
                    {allItems().map((item) => (
                        <CartItemDetail key={item.product.id} item={item} />
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}



const CartHeader = ({ count, clear }: { count: number; clear: () => void; }) => {
    const headerText = `${count} item${count > 1 ? "s" : ""}`;
    return (
        <div className="flex flex-row gap-2 items-baseline">
            <h2 className="text-2xl font-semibold">{headerText}</h2>
            <Button variant="ghost" onClick={() => clear()}>
                <span className="text-muted-foreground">clear all</span>
                <Trash2Icon className="text-muted-foreground" size={24} />
            </Button>
        </div>
    );
};

const CartAction = ({ total }: { total: number; }) => {
    const totalPrice = `USD ${total}.00`;
    return (
        <div className="flex flex-row gap-4 items-end">
            <span className="text-3xl font-bold">{totalPrice}</span>
            <Button variant="default" size="lg">
                <span className="font-semibold text-lg">Checkout</span>
                <CreditCardIcon size={32} className="ml-2 w-12 h-12" />
            </Button>
        </div>
    );
};

const CartItemDetail = ({ item }: { item: CartItem; }) => {
    return (
        <div
            key={item.product.id}
            className="flex flex-row gap-4 p-2 border rounded-md"
        >
            <Link
                className="w-full flex flex-row gap-4"
                href={`/product/${item.product.id}`}
            >
                <Image
                    className="rounded-md"
                    alt={item.product.title}
                    src={getMainImage(item.product)}
                    width={96}
                    height={96}
                />
                <CartProductSnippet item={item} />
            </Link>
            <CartPrice item={item} />
        </div>
    );
};

const CartProductSnippet = ({
    item: {
        product: { title, category, price },
    },
}: {
    item: CartItem;
}) => {
    const priceTag = `USD ${price}.00`;
    return (
        <div className="flex-1 flex flex-col h-full">
            <h3 className="font-semibold mb-2 leading-8">{title}</h3>
            <ProductCategoryTag category={category} />
            <p className="inline-block text-sm font-semibold justify-self-end">
                {priceTag}
            </p>
        </div>
    );
};

const CartPrice = ({ item }: { item: CartItem; }) => {
    const total = item.quantity * item.product.price;
    return (
        <div className="flex flex-col items-end justify-between">
            <span className="text-xl font-bold leading-10">USD {total}.00</span>
            <CartModifier product={item.product} />
        </div>
    );
};

const ProductCategoryTag = ({ category }: { category: Category; }) => {
    return (
        <p className="text-sm rounded-md bg-muted w-fit px-1 py-0 text-muted-foreground inline-block my-2">
            {category.name}
        </p>
    );
};
