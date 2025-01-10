import { type Category } from "@models/category";
import { cn } from "@utils/cn";
import { ImageLoader } from "@components/ImageLoader";

const CategoryCard = ({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        className,
        "rounded overflow-hidden shadow-lg p-2 w-[400px]"
      )}
    >
      <ImageLoader src={category.image} />
      <h3>{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
