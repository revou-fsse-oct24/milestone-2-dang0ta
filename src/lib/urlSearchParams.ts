import { ParsedUrlQuery } from "querystring";

export const getCategory = (query: ParsedUrlQuery): number | undefined => {
    const q = Number.parseInt(query.category as string);
    if (Number.isNaN((q))) {
        return undefined
    }

    return q 
}