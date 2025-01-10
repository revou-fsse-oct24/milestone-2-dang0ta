import { type Product } from "@models/product";
import { cn } from "@utils/cn";
import { ImageLoader } from "@components/ImageLoader";

const ProductCard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        className,
        "rounded overflow-hidden shadow-lg p-2 w-[400px]"
      )}
    >
      <ImageLoader src={product.mainImage} />
      <h3>{product.title}</h3>
      <p className="text-ellipsis w-full whitespace-nowrap overflow-hidden">
        {product.description}
      </p>
    </div>
  );
};

export default ProductCard;
