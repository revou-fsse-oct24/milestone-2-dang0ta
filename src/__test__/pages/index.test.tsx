/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import Page, { getServerSideProps } from '@/pages/shop/index';
import { createPropContext } from '../util';
import { getCategoriesURL, getProductsBaseURL } from '@/actions/api';

jest.mock('nextjs-toploader/app', () => ({
    useRouter() {
        push: jest.fn();
    }
}));



describe('Home', () => {
    it('renders the page correctly, given the server returns a proper response', async () => {
        const handlers = [
            http.get(getCategoriesURL(), () => {
                return HttpResponse.json([
                    {
                        id: 1,
                        name: 'Miscellaneous',
                        image: 'https://placehold.co/400'
                    }
                ]);
            }),
        
            http.get(getProductsBaseURL(), () => {
                return HttpResponse.json([
                    {
                        "id": 11,
                        "title": "Classic Red Baseball Cap",
                        "price": 35,
                        "description": "Elevate your casual wardrobe with this timeless red baseball cap. Crafted from durable fabric, it features a comfortable fit with an adjustable strap at the back, ensuring one size fits all. Perfect for sunny days or adding a sporty touch to your outfit.",
                        "images": [
                            "https://i.imgur.com/cBuLvBi.jpeg",
                            "https://i.imgur.com/N1GkCIR.jpeg",
                            "https://i.imgur.com/kKc9A5p.jpeg"
                        ],
                        "creationAt": "2025-01-24T08:29:50.000Z",
                        "updatedAt": "2025-01-24T08:29:50.000Z",
                        "category": {
                            "id": 1,
                            "name": "Tools",
                            "image": "tools.png",
                            "creationAt": "2025-01-24T08:29:50.000Z",
                            "updatedAt": "2025-01-24T09:42:00.000Z"
                        }
                    },
                    {
                        "id": 12,
                        "title": "Classic Black Baseball Cap",
                        "price": 58,
                        "description": "Elevate your casual wear with this timeless black baseball cap. Made with high-quality, breathable fabric, it features an adjustable strap for the perfect fit. Whether you’re out for a jog or just running errands, this cap adds a touch of style to any outfit.",
                        "images": [
                            "https://i.imgur.com/KeqG6r4.jpeg",
                            "https://i.imgur.com/xGQOw3p.jpeg",
                            "https://i.imgur.com/oO5OUjb.jpeg"
                        ],
                        "creationAt": "2025-01-24T08:29:50.000Z",
                        "updatedAt": "2025-01-24T08:29:50.000Z",
                        "category": {
                            "id": 1,
                            "name": "Tools",
                            "image": "tools.png",
                            "creationAt": "2025-01-24T08:29:50.000Z",
                            "updatedAt": "2025-01-24T09:42:00.000Z"
                        }
                    }
                ]);
            })
        ];
        
        const server = setupServer(...handlers);
        server.listen();

        const { props } = await getServerSideProps(createPropContext('/shop?category=1&title=test&price_min=1&price_max=100'));

        const { getByTestId } = render(<Page {...props} />);
        await waitFor(async () => {
            expect(getByTestId('banners')).toBeInTheDocument();
            expect(getByTestId('banner-category')).toBeInTheDocument();
            expect(getByTestId('banner-title')).toBeInTheDocument();
            expect(getByTestId('banner-price_min')).toBeInTheDocument();
            expect(getByTestId('banner-price_max')).toBeInTheDocument();
        });

        server.close();
    });

    it('renders an error, given the server returns an error text', async () => {
        const handlers = [
            http.get(getCategoriesURL(), () => {
                return HttpResponse.text('Internal Server Error', {status: 500});
            }),
        
            http.get(getProductsBaseURL(), () => {
                return HttpResponse.json([]);
            })
        ];
        
        const server = setupServer(...handlers);
        server.listen();

        const { props } = await getServerSideProps(createPropContext('/shop?category=1&title=test&price_min=1&price_max=100'));

        const { getByTestId } = render(<Page {...props} />);
        await waitFor(async () => {
            expect(getByTestId('error')).toBeInTheDocument();
        });

        server.close();
    });
});