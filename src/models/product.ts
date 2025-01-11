import { isNameInvalid } from "@/lib/validate";
import { Category, defaultCategory } from "./category";

const DEFAULT_IMAGE_URL = "/images/placehold_350.svg";

/**
 * Represents a product.
 */
export type Product = {
  id: number;
  title: string;
  images: string[];
  description: string;
  price: number;
  category: Category;
};

export const defaultProduct = (): Product => ({
  id: 0,
  title: "",
  images: [],
  description: "",
  price: 0,
  category: defaultCategory(),
});

export const getMainImage = (product: Product): string => {
  return product.images[0] ?? DEFAULT_IMAGE_URL;
};

export const validateProduct = (product: Product): void => {
  if (!product.id) {
    throw new Error("Invalid product ID");
  }

  if (isNameInvalid(product.title)) {
    throw new Error("Invalid product name");
  }
};

export const cleanProduct = (product: Product): Product => {
  return {
    ...product,
    images: product.images
      .map((image) => cleanImageURL(image))
      .filter((image) => !!image),
  };
};

const cleanIfJSONStrigified = (images: string): string => {
  try {
    let parsed = JSON.parse(images);
    while (Array.isArray(parsed)) {
      parsed = parsed[0];
    }

    return parsed;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return images;
  }
};

const cleanIfStartWithBracket = (image: string): string => {
  return image.startsWith('["') ? image.slice(2, -1) : image;
};

const cleanIfInvalidtURL = (image: string): string => {
  try {
    const url = new URL(image);
    if (url.hostname != "i.imgur.com" && url.hostname != "placehold.co") {
      return DEFAULT_IMAGE_URL;
    }

    return url.toString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return DEFAULT_IMAGE_URL;
  }
};

/**
 * Cleans the image URL by parsing it if necessary.
 * @param images - The image URL or JSON string
 * @returns The cleaned image URL
 */
const cleanImageURL = (images: string): string =>
  cleanIfInvalidtURL(cleanIfStartWithBracket(cleanIfJSONStrigified(images)));
