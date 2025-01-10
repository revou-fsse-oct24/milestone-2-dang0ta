import { Product } from "@models/product";
import { cn } from "@utils/cn";

const ProductCard = ({product, className}: {product: Product, className?: string}) => {
  return (
    <div className={cn(className, "rounded overflow-hidden shadow-lg p-2")}>
    <img width={400} height={400} src={product.mainImage} alt="" />
    <h3>{product.title}</h3>
    <p className="text-ellipsis w-full">{product.description}</p>
    </div>
  )
}

export default ProductCard