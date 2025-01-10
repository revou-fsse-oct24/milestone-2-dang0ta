import { getCategories } from "@actions/categories";
import { useResponse } from "@hooks/useResponse";
import { Category } from "@models/category";
import { Link, Navigate, useSearchParams } from "react-router-dom";

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
        <span className="capitalize">
          {selected ? "selected:" : ""} {category.name}
        </span>
      </div>
    </Link>
  );
};

export const CategoryList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, response } = useResponse<Category[]>(getCategories);

  const isSelected = (id: string): boolean =>
    searchParams.get("category") ? searchParams.get("category") === id : false;

  if (state === "loading" || state === "init") {
    return <>loading categories...</>;
  }

  if (!response) {
    return <Navigate to="/" />;
  }

  const updateSelectedCategory = (id: string) => {
    setSearchParams({ category: id });
  };

  return (
    <div className="flex flex-col">
      {response.data
        .sort((a, b) => (a.id > b.id ? 0 : 1))
        .map((category) => (
          <CategoryListItem
            key={category.id}
            category={category}
            selected={isSelected(`${category.id}`)}
            onSelect={() => updateSelectedCategory(`${category.id}`)}
          />
        ))}
    </div>
  );
};
