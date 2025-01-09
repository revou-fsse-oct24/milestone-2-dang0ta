export const baseURL = (): URL => new URL("https://api.escuelajs.co");
export const getCategoriesURL = (): string => new URL("api/v1/categories", baseURL()).toString();
export const getCategoryURL = ({id}: {id: string}): string => new URL(`api/v1/categories/${id}`, baseURL()).toString(); 
export const getProductsByCategoryURL = ({id}: {id: string}): string => new URL(`api/v1/categories/${id}/products`, baseURL()).toString();
export const getProductsURL = (offset: number, limit: number=10): string => new URL(`api/v1/products?offest=${offset}&limit=${limit}`, baseURL()).toString();
export const getProductURL = ({id}: {id: string}): string => new URL(`api/v1/products/${id}`, baseURL()).toString();

/**
 * Response is a generic response for all API call responses, 
 * it provide parsed error message to ease up error handling on component-level
 */
export type Response<T> = {
    status: "success" | "error"
    data: T
    error?: string;
}
