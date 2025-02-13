import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { Cookies, createRequest, createResponse } from "node-mocks-http";

export const createPropContext = (resolvedUrl: string, cookies?: Cookies): GetServerSidePropsContext => {
    const query = {} as ParsedUrlQuery;
    const params = new URLSearchParams(resolvedUrl.split('?')[1]);
    params.keys().forEach(key => query[key] = params.get(key) as string);

    const req = createRequest({
        method: 'GET',
        cookies:cookies,
    })

    const res = createResponse();
    return { req, res, query, resolvedUrl };
}