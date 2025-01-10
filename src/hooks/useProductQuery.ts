import { Response, ProductsQuery } from "@actions/api";
import { parseError } from "@actions/exceptions";
import { queryProducts } from "@actions/products";
import { Product } from "@models/product";
import { useCallback, useEffect, useState } from "react";

type State = {
    status: "init" | "loading" | "loaded";
    response?: Response<Product[]>;
}

export const useProductQuery = (intialQuery: ProductsQuery) => {
    const [query, setQuery] = useState<ProductsQuery>(intialQuery)
    const [state, setState] =useState<State>({status: "init"})

    const fetchProduct = useCallback(async () => {
        setState({status: "loading"})
        try {
            const res = await queryProducts(query);
            setState({status: "loaded", response: res})
        } catch (e) {
            console.warn({e})
            const parsedError = parseError(e)
            setState({
                status: "loaded",
                response: {
                    status: "error",
                    data: [],
                    error: parsedError.message
                }
            })
        }
    }, [query])

    useEffect(() => {
        fetchProduct()
    }, [query, fetchProduct])

    return {state, query, setQuery} as const;
}