import { Html, Head, Main, NextScript } from "next/document";
import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL(siteConfig.url),
    description: siteConfig.description,
    keywords: ["Case Management", "Managed Security Service"],
    authors: [
        {
            name: "shopmart.dev",
            url: "https://shopmart.dev",
        },
    ],
    creator: "dang0ta",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@shadcn",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/manifest.webmanifest`,
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout() {
    return (
        <Html lang="en">
            <Head />
            <body className="antialiased">
                <NextTopLoader />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
