'use server';

import { cleanProduct, defaultProduct, Product, validateProduct } from "@/models/product";
import {
  getProductsURL,
  getProductURL,
  Response,
  ProductsQuery,
  queryProductsURL,
} from "./api";
import { parseError } from "./exceptions";
import { skipErroneousFunctional } from "@/lib/skipErroneous";
import { uniqueOnly } from "@/lib/uniqueOnly";

export async function queryProducts(
  query: ProductsQuery
): Promise<Response<Product[]>> {
  try {
    const url = queryProductsURL(query);
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(res.statusText);
      return {
        status: "error",
        data: [],
        error: "An error occurred while fetching the data",
      };
    }

    const raws = ((await res.json()) as Product[]).map((product) =>
      cleanProduct(product)
    );
    return {
      status: "success",
      data: uniqueOnly(skipErroneousFunctional<Product>(raws, validateProduct)),
    };
  } catch (e) {
    const parsedErr = parseError(e);
    return { status: "error", data: [], error: parsedErr.message };
  }
}

/**
 * Fetches a list of latest 10 products from the API.
 * @param {Object} params - The parameters for fetching products.
 * @param {number} params.offset - The offset for pagination.
 * @returns {Promise<Response<Product[]>>} The response containing the list of products.
 */
export async function getLatestProducts(): Promise<Response<Product[]>> {
  try {

    const res = await fetch(getProductsURL());
    if (!res.ok) {
      console.warn(res.statusText);
      return {
        status: "error",
        data: [],
        error: "An error occurred while fetching the data",
      };
    }

    const raws = ((await res.json()) as Product[]).map((product) =>
        cleanProduct(product)
      );
      return {
        status: "success",
        data: uniqueOnly(skipErroneousFunctional<Product>(raws, validateProduct)),
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
    const res = await fetch(getProductURL({ id }));
    if (!res.ok) {
      console.warn(res.statusText, id);
      return {
        status: "error",
        data: defaultProduct(),
        error: "An error occurred while fetching the data",
      };
    }

    const data = cleanProduct((await res.json()) as Product);
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
