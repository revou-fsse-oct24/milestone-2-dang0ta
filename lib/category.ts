import { parseError } from './exceptions';
import { ERR_NOTFOUND } from './const';
import { getCategoriesURL, getCategoryURL, Response } from './api';

/**
 * Represents a category.
 */
export type Category = {
    id: number;
    name: string;
    image: string;
}

/**
 * Returns a default category object.
 * @returns {Category} The default category object.
 */
const defaultCategory = (): Category => {
    return{
        id: 0,
        name: "",
        image: ""
    }
}

/**
 * Fetches a list of categories from the API.
 * @returns {Promise<Response<Category[]>>} The response containing the list of categories.
 */
export async function getCategories(): Promise<Response<Category[]>> {
    try {
        const res = await fetch(getCategoriesURL());
        if (!res.ok) {
            console.warn(res.statusText);
            return {status: "error", data: [], error: "An error occurred while fetching the data"}
        }

        const data = await res.json() as Category[];
        return {status: "success", data}
    } catch(e) {
        const parsedErr = parseError(e)
        return {status: "error", data: [], error: parsedErr.message}
    }
}

/**
 * Fetches a single category by its ID from the API.
 * @param {Object} params - The parameters for fetching the category.
 * @param {string} params.id - The ID of the category.
 * @returns {Promise<Response<Category>>} The response containing the category.
 */
export async function getCategory({id}: {id: string}): Promise<Response<Category>> {
    try {
        const res = await fetch(getCategoryURL({id}));
        if (!res.ok) {
            console.warn(res.statusText, id);
            if (res.status === 404) {
                return {status: "error", data: defaultCategory(), error: ERR_NOTFOUND}
            }

            return {status: "error", data: defaultCategory(), error: "An error occurred while fetching the data"}
        }

        const data = await res.json() as Category;
        return {status: "success", data}
    } catch(e) {
        const parsedErr = parseError(e)
        return {status: "error", data: defaultCategory(), error: parsedErr.message}
    }
}