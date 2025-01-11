import { type Category } from "@/models/category";
import { cn } from "@/lib/utils";
import { ImageLoader } from "@/components/ImageLoader";

const CategoryCard = ({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) => {
  return (
    <div className={cn(className, "w-[200px] overflow-hidden rounded-md")}>
      <ImageLoader
      width={200}
      height={200}
        className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square"
        src={category.image}
      />
      <div className="flex flex-col gap-2 py-4">
      <h3 className="font-medium leading-none capitalize">{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
