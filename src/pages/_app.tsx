import { Providers } from "@/providers/global.provider";
import "@/styles/globals.css";  
import { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
    return <Providers><Component {...pageProps} /></Providers>;
}