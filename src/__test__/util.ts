import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { createRequest, createResponse } from "node-mocks-http";

export const createPropContext = (resolvedUrl: string): GetServerSidePropsContext => {
    const query = {} as ParsedUrlQuery;
    const params = new URLSearchParams(resolvedUrl.split('?')[1]);
    params.keys().forEach(key => query[key] = params.get(key) as string);

    const req = createRequest({
        method: 'GET',
    })

    const res = createResponse();
    return { req, res, query, resolvedUrl };
}