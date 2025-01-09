/**
 * Returns the base URL for the API.
 * @returns {URL} The base URL.
 */
export const baseURL = (): URL => new URL("https://api.escuelajs.co");

// categories

/**
 * Returns the URL for fetching categories.
 * @returns {string} The URL for fetching categories.
 */
export const getCategoriesURL = (): string => new URL("api/v1/categories", baseURL()).toString();

/**
 * Returns the URL for fetching a specific category by ID.
 * @param {Object} params - The parameters for fetching the category.
 * @param {string} params.id - The ID of the category.
 * @returns {string} The URL for fetching the category.
 */
export const getCategoryURL = ({id}: {id: string}): string => new URL(`api/v1/categories/${id}`, baseURL()).toString(); 

/**
 * Returns the URL for fetching products by category ID.
 * @param {Object} params - The parameters for fetching products by category.
 * @param {string} params.id - The ID of the category.
 * @returns {string} The URL for fetching products by category.
 */
export const getProductsByCategoryURL = ({id}: {id: string}): string => new URL(`api/v1/categories/${id}/products`, baseURL()).toString();

// products

/**
 * Returns the URL for fetching products with pagination.
 * @param {number} offset - The offset for pagination.
 * @param {number} [limit=10] - The limit for pagination.
 * @returns {string} The URL for fetching products.
 */
export const getProductsURL = (offset: number, limit: number=10): string => new URL(`api/v1/products?offest=${offset}&limit=${limit}`, baseURL()).toString();

/**
 * Returns the URL for fetching a specific product by ID.
 * @param {Object} params - The parameters for fetching the product.
 * @param {string} params.id - The ID of the product.
 * @returns {string} The URL for fetching the product.
 */
export const getProductURL = ({id}: {id: string}): string => new URL(`api/v1/products/${id}`, baseURL()).toString();

// auth JWT

/**
 * Returns the URL for logging in.
 * @returns {string} The URL for logging in.
 */
export const loginURL = (): string => new URL("api/v1/auth/login", baseURL()).toString();

/**
 * Returns the URL for fetching the user profile.
 * @returns {string} The URL for fetching the user profile.
 */
export const getUserURL = (): string => new URL("api/v1/auth/profile", baseURL()).toString();

/**
 * Returns the URL for refreshing the access token.
 * @returns {string} The URL for refreshing the access token.
 */
export const refreshTokenURL = (): string => new URL("api/v1/auth/refresh", baseURL()).toString();

/**
 * Response is a generic response for all API call responses, 
 * it provides parsed error message to ease up error handling on component-level.
 * @template T
 */
export type Response<T> = {
    status: "success" | "error"
    data: T
    error?: string;
}
