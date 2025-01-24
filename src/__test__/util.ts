import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { createRequest, createResponse } from "node-mocks-http";

export const createPropContext = (query: ParsedUrlQuery, resolvedUrl: string): GetServerSidePropsContext => {
    const req = createRequest({
        method: 'GET',
    })

    const res = createResponse();
    return { req, res, query, resolvedUrl };
}