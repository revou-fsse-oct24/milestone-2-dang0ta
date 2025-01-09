import { getProductsURL, Response } from "./api";
import { parseError } from "./exceptions";

/**
 * Represents a product.
 */
export type Product = {
  id: number;
  title: string;
  images: string[];
  description: string;
  price: number;
  category: string;
};

/**
 * Returns a default product object.
 * @returns {Product} The default product object.
 */
const defaultProduct = (): Product => {
  return {
    id: 0,
    title: "",
    images: [],
    description: "",
    price: 0,
    category: "",
  };
};

/**
 * Fetches a list of products from the API.
 * @param {Object} params - The parameters for fetching products.
 * @param {number} params.offset - The offset for pagination.
 * @returns {Promise<Response<Product[]>>} The response containing the list of products.
 */
export async function getProducts({
  offset,
}: {
  offset: number;
}): Promise<Response<Product[]>> {
  try {
    const res = await fetch(getProductsURL(offset));
    if (!res.ok) {
      console.warn(res.statusText);
      return {
        status: "error",
        data: [],
        error: "An error occurred while fetching the data",
      };
    }

    const data = (await res.json()) as Product[];
    return { status: "success", data };
  } catch (e) {
    const parsedErr = parseError(e);
    return { status: "error", data: [], error: parsedErr.message };
  }
}

/**
 * Fetches a single product by its ID from the API.
 * @param {Object} params - The parameters for fetching the product.
 * @param {string} params.id - The ID of the product.
 * @returns {Promise<Response<Product>>} The response containing the product.
 */
export async function getProduct({
  id,
}: {
  id: string;
}): Promise<Response<Product>> {
  try {
    const res = await fetch(getProductsURL(parseInt(id)));
    if (!res.ok) {
      console.warn(res.statusText, id);
      return {
        status: "error",
        data: defaultProduct(),
        error: "An error occurred while fetching the data",
      };
    }

    const data = (await res.json()) as Product;
    return { status: "success", data };
  } catch (e) {
    const parsedErr = parseError(e);
    return {
      status: "error",
      data: defaultProduct(),
      error: parsedErr.message,
    };
  }
}
