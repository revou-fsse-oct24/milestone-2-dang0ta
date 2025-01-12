import { getMainImage, type Product } from "@/models/product";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ProductCard = ({
    product,
    className,
}: {
    product: Product;
    className?: string;
}) => {
    const mainImage = getMainImage(product);
    return (
        <div className={cn(className, "w-[350px] overflow-hidden rounded-md")}>
            <Image
                alt={product.title}
                width={350}
                height={350}
                sizes="(max-width: 350px) 100vw, 350px"
                className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
                src={mainImage}
            />
            <div className="flex flex-row py-4 w-full items-start justify-between">
                <div className="flex flex-col gap-2 flex-1 max-w-[250px]">
                    <h3 className="font-medium leading-none capitalize">{product.title}</h3>
                    <p className="text-xs text-muted-foreground text-ellipsis whitespace-nowrap overflow-hidden">
                        {product.description}
                    </p>
                </div>
                <p className="font-medium leading-none">${product.price}.00</p>
            </div>
        </div>
    );
};

export default ProductCard;
