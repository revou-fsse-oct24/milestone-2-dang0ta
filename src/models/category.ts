import { isNameInvalid } from "@utils/validate";

/**
 * Represents a category.
 */
export type CategoryRaw = {
  id: number;
  name: string;
  image: string;
};

export class Category {
  readonly id: number;
  readonly name: string;
  readonly image: string;

  static default(): Category {
    return new Category({
      id: 0,
      name: "",
      image: "",
    });
  }

  constructor(category: CategoryRaw) {
    if (!category.id) {
      throw new Error("Invalid category ID");
    }

    if (isNameInvalid(category.name)) {
      throw new Error("Invalid category name");
    }

    this.id = category.id;
    this.name = category.name;
    this.image = category.image;
  }
}
