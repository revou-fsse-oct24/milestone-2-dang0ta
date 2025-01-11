import { type Product } from "@/models/product";
import { cn } from "@/lib/utils";
import { ImageLoader } from "@/components/ImageLoader";

const ProductCard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div className={cn(className, "w-[350px] overflow-hidden rounded-md")}>
      <ImageLoader
        className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
        src={product.mainImage}
      />
      <div className="flex flex-col gap-2 py-4">
      <h3 className="font-medium leading-none capitalize">{product.title}</h3>
      <p className="text-xs text-muted-foreground text-ellipsis w-full whitespace-nowrap overflow-hidden">
        {product.description}
      </p>
      </div>
    </div>
  );
};

export default ProductCard;
