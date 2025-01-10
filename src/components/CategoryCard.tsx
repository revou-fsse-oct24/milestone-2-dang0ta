import { type Category } from "@models/category";
import { cn } from "@utils/cn";

const CategoryCard = ({category, className}: {category: Category, className?: string}) => {
  return (
    <div className={cn(className, "rounded overflow-hidden shadow-lg p-2")}>
    <img width={400} height={400} src={category.image} alt="" />
    <h3>{category.name}</h3>
    </div>
  )
}

export default CategoryCard