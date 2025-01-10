import { Product, ProductRaw } from "@models/product";
import { getProductsURL, Response } from "./api";
import { parseError } from "./exceptions";
import { TimedCache } from "@utils/timedCache";


const productsCache = new TimedCache<ProductRaw[]>("products_cache");

/**
 * Fetches a list of products from the API.
 * @param {Object} params - The parameters for fetching products.
 * @param {number} params.offset - The offset for pagination.
 * @returns {Promise<Response<Product[]>>} The response containing the list of products.
 */
export async function getProducts({
  offset,
  limit,
}: {
  offset?: number;
  limit?: number;
}): Promise<Response<Product[]>> {
  try {
    const cached = productsCache.get();
    if (cached) {
      return { status: "success", data: cached.map(raw => new Product(raw)) };
    }

    const res = await fetch(getProductsURL(offset, limit));
    if (!res.ok) {
      console.warn(res.statusText);
      return {
        status: "error",
        data: [],
        error: "An error occurred while fetching the data",
      };
    }

    const raws = ((await res.json()) as ProductRaw[]);
    productsCache.set(raws);
    return { status: "success", data: parseRawProducts(raws)};
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
        const raw = value.find(raw => raw.id === parseInt(id));
        if (raw) {
            return { status: "success", data: new Product(raw) };
        }
    }

    const res = await fetch(getProductsURL(parseInt(id)));
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

const parseRawProducts = (json: ProductRaw[]): Product[] => {
    const products: Product[] = [];

    json.forEach((raw)=> {
        try {
            products.push(new Product(raw));
        } catch(e) {
            console.warn("Failed to parse product", e);
        }
    })

    return products;
}