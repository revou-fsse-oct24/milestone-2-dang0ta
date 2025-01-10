import { Category } from "@models/category";
import { useState } from "react";
import { Link } from "react-router-dom";

const CategoryListItem = ({
  category,
  selected,
  onSelect,
}: {
  category: Category;
  selected?: boolean;
  onSelect: () => void;
}) => {
  return (
    <Link key={category.id} to={`/products?category=${category.id}`}>
      <div onClick={() => onSelect()}>
        <span className="capitalize">{selected ? "selected:" : ""} {category.name}</span>
      </div>
    </Link>
  );
};

export const CategoryList = ({
  categories,
  selected,
}: {
  categories: Category[];
  selected?: string;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    selected
  );

  const isSelected = (id: string): boolean =>
    selectedCategory ? selectedCategory === id : false;
  return (
    <div className="flex flex-col">
      {categories.map((category) => (
        <CategoryListItem
          key={category.id}
          category={category}
          selected={isSelected(`${category.id}`)}
          onSelect={() => setSelectedCategory(`${category.id}`)}
        />
      ))}
    </div>
  );
};
