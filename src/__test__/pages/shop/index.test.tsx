
import { fireEvent, render, waitFor } from '@testing-library/react';

import { http, HttpResponse } from 'msw';
import Page, { getServerSideProps } from '@/pages/shop/index';
import { createPropContext } from '../../util';
import { getCategoriesURL, getProductsBaseURL } from '@/actions/api';

import { server } from "@/__mocks__/server";
import { getCategoriesResponse, getProductsResponse } from './data';
import { useRouter } from 'nextjs-toploader/app';
import { describe, it, expect, vi, Mock } from 'vitest'


vi.mock('nextjs-toploader/app', () => ({
    useRouter: vi.fn(),
}));


describe('common cases, happy path 😊', () => {

    it('renders products grouped into categories, and each product has proper href', async () => {
        server.use(http.get(getCategoriesURL(), () => {
            return HttpResponse.json(getCategoriesResponse);
        }),

        http.get(getProductsBaseURL(), () => {
            return HttpResponse.json(getProductsResponse);
        }));
        

        const { props } = await getServerSideProps(createPropContext('/shop'));
        const { getAllByTestId } = render(<Page {...props} />);
        await waitFor(async () => {
            const categories = getAllByTestId('category');
            expect(categories.length).not.toBe(0);
            expect(categories.length).toBe(getCategoriesResponse.length);

            const products = getAllByTestId('product');
            expect(products.length).not.toBe(0);
            expect(products.length).toBe(getCategoriesResponse.length * getProductsResponse.length);

            products.forEach(product => {
                expect(product.querySelector('a')).toHaveAttribute('href', expect.stringMatching(/\/shop\/product\/\d+/));
            });
        })


    })

    it('renders the filter chips correctly, and the correct search parameter is removed when chip is clicked', async () => {
        server.use(http.get(getCategoriesURL(), () => {
            return HttpResponse.json(getCategoriesResponse);
        }),

        http.get(getProductsBaseURL(), () => {
            return HttpResponse.json(getProductsResponse);
        }));

        const mockRouter = { push: vi.fn() };
        (useRouter as Mock).mockReturnValue(mockRouter);

        const params = new URLSearchParams('category=1&title=test&price_min=1&price_max=100')
        const { props } = await getServerSideProps(createPropContext('/shop?' + params.toString()));

        const { getByTestId } = render(<Page {...props} />);
        await waitFor(async () => {
            
            expect(getByTestId('banners')).toBeInTheDocument();
            expect(getByTestId('banner-category')).toBeInTheDocument();
            expect(getByTestId('banner-title')).toBeInTheDocument();
            expect(getByTestId('banner-price_min')).toBeInTheDocument();
            expect(getByTestId('banner-price_max')).toBeInTheDocument();

            fireEvent.click(getByTestId('banner-category').querySelector('button') as Element);
            expect(mockRouter.push).toHaveBeenCalledWith(expect.not.stringContaining('category'))

            fireEvent.click(getByTestId('banner-title').querySelector('button') as Element);
            expect(mockRouter.push).toHaveBeenCalledWith(expect.not.stringContaining('title'));

            fireEvent.click(getByTestId('banner-price_min').querySelector('button') as Element);
            expect(mockRouter.push).toHaveBeenCalledWith(expect.not.stringContaining('price_min'))

            fireEvent.click(getByTestId('banner-price_max').querySelector('button') as Element);
            expect(mockRouter.push).toHaveBeenCalledWith(expect.not.stringContaining('price_max'))
        });
    });
});

describe("edge cases", () => {
    it('renders the filter chips correctly, and the correct search parameter is removed when chip is clicked, when there\'s no category selected', async () => {
        server.use(http.get(getCategoriesURL(), () => {
            return HttpResponse.json(getCategoriesResponse);
        }),

        http.get(getProductsBaseURL(), () => {
            return HttpResponse.json(getProductsResponse);
        }));

        const mockRouter = { push: vi.fn() };
        (useRouter as Mock).mockReturnValue(mockRouter);

        const params = new URLSearchParams('title=test&price_min=1&price_max=100')
        const { props } = await getServerSideProps(createPropContext('/shop?' + params.toString()));

        const { getByTestId } = render(<Page {...props} />);
        await waitFor(async () => {
            
            expect(getByTestId('banners')).toBeInTheDocument();
            expect(getByTestId('banner-title')).toBeInTheDocument();
            expect(getByTestId('banner-price_min')).toBeInTheDocument();
            expect(getByTestId('banner-price_max')).toBeInTheDocument();

            fireEvent.click(getByTestId('banner-title').querySelector('button') as Element);
            expect(mockRouter.push).toHaveBeenCalledWith(expect.not.stringContaining('title'));

            fireEvent.click(getByTestId('banner-price_min').querySelector('button') as Element);
            expect(mockRouter.push).toHaveBeenCalledWith(expect.not.stringContaining('price_min'))

            fireEvent.click(getByTestId('banner-price_max').querySelector('button') as Element);
            expect(mockRouter.push).toHaveBeenCalledWith(expect.not.stringContaining('price_max'))
        });
    });

    it('should load /shop when the last query filter chip is removed', async () => {
        server.use(http.get(getCategoriesURL(), () => {
            return HttpResponse.json(getCategoriesResponse);
        }),

        http.get(getProductsBaseURL(), () => {
            return HttpResponse.json(getProductsResponse);
        }));

        const mockRouter = { push: vi.fn() };
        (useRouter as Mock).mockReturnValue(mockRouter);

        const params = new URLSearchParams('title=test')
        const { props } = await getServerSideProps(createPropContext('/shop?' + params.toString()));

        const { getByTestId } = render(<Page {...props} />);
        await waitFor(async () => {
            
            expect(getByTestId('banners')).toBeInTheDocument();
            expect(getByTestId('banner-title')).toBeInTheDocument();

            fireEvent.click(getByTestId('banner-title').querySelector('button') as Element);
            expect(mockRouter.push).toHaveBeenCalledWith('/shop');
        });
    });
})

describe("error handling", () => {
    it('renders an error, given the server returns an error text', async () => {
        server.use(
            http.get(getCategoriesURL(), () => {
                return HttpResponse.text('Internal Server Error', { status: 500 });
            }),

            http.get(getProductsBaseURL(), () => {
                return HttpResponse.json([]);
            })
        );

        const { props } = await getServerSideProps(createPropContext('/shop?category=1&title=test&price_min=1&price_max=100'));

        const { getByTestId } = render(<Page {...props} />);
        await waitFor(async () => {
            expect(getByTestId('error')).toBeInTheDocument();
        });
    });
})