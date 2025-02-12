import { ParsedUrlQuery } from "querystring";

export const createQueryFilterItems = (searchParams: ParsedUrlQuery): { key: string, label: string; }[] => {
    const banners: { key: string, label: string; }[] = [];
    const title = searchParams.title;
    if (title) {
        banners.push({ key: "title", label: `title: ${title}` });
    }

    const price_min = searchParams.price_min;
    if (price_min) {
        banners.push({ key: "price_min", label: `price min. USD${price_min}.00` });
    }

    const price_max = searchParams.price_max;
    if (price_max) {
        banners.push({ key: "price_max", label: `price max. USD${price_max}.00` });
    }

    return banners;
};