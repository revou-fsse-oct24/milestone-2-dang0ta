import { Providers } from "@/providers/global.provider";
import "@/styles/globals.css";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <Providers>
            <NextTopLoader />
            {getLayout(<Component {...pageProps} />)}
            <Toaster />
        </Providers>
    );
}