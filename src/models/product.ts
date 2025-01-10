import { isNameInvalid } from "@utils/validate";
import { Category, CategoryRaw } from "./category";

const DEFAULT_IMAGE_URL = "https://placehold.co/400";

/**
 * Represents a product.
 */
export type ProductRaw = {
  id: number;
  title: string;
  images: string[];
  description: string;
  price: number;
  category: CategoryRaw;
};

export class Product {
  readonly id: number;
  readonly title: string;
  readonly images: string[];
  readonly description: string;
  readonly price: number;
  readonly category: Category;
  readonly mainImage: string;

  /**
   * Returns a default Product instance.
   */
  static default(): Product {
    return new Product({
      id: 0,
      title: "",
      images: [],
      description: "",
      price: 0,
      category: Category.default(),
    });
  }

  /**
   * Constructs a Product instance from a raw product object.
   * @param product - The raw product data
   */
  constructor(product: ProductRaw) {
    if (!product.id) {
      throw new Error("Invalid product ID");
    }

    if (isNameInvalid(product.title)) {
      throw new Error("Invalid product name");
    }

    this.id = product.id;
    this.title = product.title;
    this.images = product.images?.map(cleanImageURL);
    this.description = product.description;
    this.price = product.price;
    this.category = new Category(product.category);
    this.mainImage = this.images?.length
      ? this.images[0]
      : DEFAULT_IMAGE_URL;
  }
}

/**
 * Cleans the image URL by parsing it if necessary.
 * @param images - The image URL or JSON string
 * @returns The cleaned image URL
 */
const cleanImageURL = (images: string): string => {
  try {
    const stringified = JSON.parse(images);
    if (Array.isArray(stringified)) {
      return stringified[0];
    }

    return stringified;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    return images;
  }
};
