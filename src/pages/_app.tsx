import { Providers } from "@/providers/global.provider";
import "@/styles/globals.css";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { PagesTopLoader } from 'nextjs-toploader/pages';
import { Toaster } from "@/components/ui/toaster";
import PageLayout from "@/components/pages/page-layout";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => <PageLayout>{page}</PageLayout>);
    return (
        <Providers>
            <PagesTopLoader />
            {getLayout(<Component {...pageProps} />)}
            <Toaster />
        </Providers>
    );
}