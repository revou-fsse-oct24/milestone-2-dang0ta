import { Product, ProductRaw } from "@models/product";
import { getProductsURL, getProductURL, Response } from "./api";
import { parseError } from "./exceptions";
import { TimedCache } from "@utils/timedCache";
import { skipErroneous } from "@utils/skipErroneous";

const productsCache = new TimedCache<ProductRaw[]>("products_cache");



/**
 * Fetches a list of latest 10 products from the API.
 * @param {Object} params - The parameters for fetching products.
 * @param {number} params.offset - The offset for pagination.
 * @returns {Promise<Response<Product[]>>} The response containing the list of products.
 */
export async function getLatestProducts(): Promise<Response<Product[]>> {
  try {
    const cached = productsCache.get();
    if (cached) {
      return {
        status: "success",
        data: skipErroneous<ProductRaw, Product>(cached, Product),
      };
    }

    const res = await fetch(getProductsURL());
    if (!res.ok) {
      console.warn(res.statusText);
      return {
        status: "error",
        data: [],
        error: "An error occurred while fetching the data",
      };
    }

    const raws = (await res.json()) as ProductRaw[];
    productsCache.set(raws);
    return {
      status: "success",
      data: skipErroneous<ProductRaw, Product>(raws, Product),
    };
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
    const value = productsCache.get();
    if (value) {
      const raw = value.find((raw) => raw.id === parseInt(id));
      if (raw) {
        const product = new Product(raw)
        return { status: "success", data: product };
      }
    }
  } catch (e) {
    console.warn("cache value has error", { error: e, id });
  }

  try {
    const res = await fetch(getProductURL({id}));
    if (!res.ok) {
      console.warn(res.statusText, id);
      return {
        status: "error",
        data: Product.default(),
        error: "An error occurred while fetching the data",
      };
    }

    const data = new Product(await res.json());
    return { status: "success", data };
  } catch (e) {
    const parsedErr = parseError(e);
    return {
      status: "error",
      data: Product.default(),
      error: parsedErr.message,
    };
  }
}
