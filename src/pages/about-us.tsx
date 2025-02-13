import Head from "next/head";

export default function AboutUsPage() {
    return (
        <>
            <Head>
                <title>About ShopMart</title>
            </Head>
            <div className="p-4 max-w-screen-xl flex flex-col space-y-2">
                <h1 data-testid="title" className="text-3xl font-bold tracking-tight">About Us</h1>
                <p data-testid="subtitle">Welcome to Shopmart, your go-to online e-commerce platform for all your shopping needs. Built using Next.js, Shadcn, and the Platzi Fake Store API, we aim to provide a seamless and enjoyable shopping experience.</p>
                <h2 data-testid="mission" className="font-semibold leading-8 tracking-tight">Our Mission</h2>
                <p>At Shopmart, our mission is to offer a wide variety of products at competitive prices, ensuring customer satisfaction and convenience.</p>
                <h2 data-testid="technologies" className="font-semibold leading-8 tracking-tight">Technologies We Use</h2>
                <ul>
                    <li><strong>Next.js:</strong> A powerful React framework for building fast and scalable web applications.</li>
                    <li><strong>Shadcn:</strong> A design system that helps us create beautiful and consistent user interfaces.</li>
                    <li><strong>Platzi Fake Store API:</strong> A mock API that provides us with realistic product data for development and testing purposes.</li>
                </ul>
                <h2 data-testid="contact" className="font-semibold leading-8 tracking-tight">Contact Us</h2>
                <p>If you have any questions or feedback, feel free to reach out to us at support@shopmart.com.</p>
            </div>
        </>
    );
}