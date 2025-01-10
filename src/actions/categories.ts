import { parseError } from "./exceptions";
import { ERR_NOTFOUND } from "./const";
import { getCategoriesURL, getCategoryURL, Response } from "./api";
import { Category, CategoryRaw } from "@models/category";
import { TimedCache } from "@utils/timedCache";
import { skipErroneous } from "@utils/skipErroneous";
import { uniqueOnly } from "@utils/uniqueOnly";

const categoriesCache = new TimedCache<CategoryRaw[]>("categories_cache");

/**
 * Fetches a list of categories from the API.
 * @returns {Promise<Response<Category[]>>} The response containing the list of categories.
 */
export async function getCategories(): Promise<Response<Category[]>> {
  try {
    const cached = categoriesCache.get();
    if (cached) {
      return {
        status: "success",
        data: uniqueOnly(skipErroneous<CategoryRaw, Category>(cached, Category))
      };
    }

    const res = await fetch(getCategoriesURL());
    if (!res.ok) {
      console.warn(res.statusText);
      return {
        status: "error",
        data: [],
        error: "An error occurred while fetching the data",
      };
    }

    const raws = (await res.json()) as CategoryRaw[];
    categoriesCache.set(raws);
    return {
      status: "success",
      data: uniqueOnly(skipErroneous<CategoryRaw, Category>(raws, Category))
    };
  } catch (e) {
    const parsedErr = parseError(e);
    return { status: "error", data: [], error: parsedErr.message };
  }
}
/**
 * Fetches a single category by its ID from the API.
 * @param {Object} params - The parameters for fetching the category.
 * @param {string} params.id - The ID of the category.
 * @returns {Promise<Response<Category>>} The response containing the category.
 */
export async function getCategory({
  id,
}: {
  id: string;
}): Promise<Response<Category>> {
  try {
    const res = await fetch(getCategoryURL({ id }));
    if (!res.ok) {
      console.warn(res.statusText, id);
      if (res.status === 404) {
        return {
          status: "error",
          data: Category.default(),
          error: ERR_NOTFOUND,
        };
      }

      return {
        status: "error",
        data: Category.default(),
        error: "An error occurred while fetching the data",
      };
    }

    const data = new Category(await res.json());
    return { status: "success", data };
  } catch (e) {
    const parsedErr = parseError(e);
    return {
      status: "error",
      data: Category.default(),
      error: parsedErr.message,
    };
  }
}
