import { isNameInvalid } from "@/lib/validate";

export type Category = {
  id: number;
  name: string;
  image: string;
};

export const validateCategory = (category: Category): void => {
  if (!category.id) {
    throw new Error("Invalid category ID");
  }

  if (isNameInvalid(category.name)) {
    throw new Error("Invalid category name");
  }
};

export const defaultCategory = (): Category => ({
  id: 0,
  name: "Uncategorized",
  image: "",
});
