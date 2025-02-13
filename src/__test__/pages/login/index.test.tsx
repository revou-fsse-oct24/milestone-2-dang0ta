import { fireEvent, render, waitFor } from '@testing-library/react';
import LoginPage from '@/pages/login';
import { server } from "@/__mocks__/server";
import { http, HttpResponse } from 'msw';
import { INVALID_EMAIL_ADDRESS_MESSAGE, SHORT_PASSWORD_MESSAGE } from '@/models/login-credential';
import { useRouter } from 'nextjs-toploader/app';
import { FORBIDDEN_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE, UNAUTHORIZED_MESSAGE } from '@/pages/api/login';
import { describe, it, expect, vi, Mock } from 'vitest'

vi.mock('nextjs-toploader/app', () => ({
    useRouter: vi.fn(),
}));

describe('common cases, happy path', () => {
    it('common form validation', async () => {
        server.use(http.post('/api/login', () => new HttpResponse(null, {
            type: 'basic',
            status: 307,
            headers: {
                Location: '/',
            }
        })))

        const mockRouter = { replace: vi.fn(), pathname: '/' };
        
        (useRouter as Mock).mockReturnValue(mockRouter);
        const {getByTestId} = render(<LoginPage />);

        await waitFor(() => {
            const emailInput = getByTestId('email-input');
            expect(emailInput).toBeInTheDocument();

            const passwordInput = getByTestId('password-input');
            expect(passwordInput).toBeInTheDocument();

            const submitButton = getByTestId('submit-button');
            expect(submitButton).toBeInTheDocument();

            fireEvent.click(submitButton);
            expect(getByTestId('email-input-message')).toBeInTheDocument();
            expect(getByTestId('email-input-message')).toHaveTextContent(INVALID_EMAIL_ADDRESS_MESSAGE);
            expect(getByTestId('password-input-message')).toBeInTheDocument();
            expect(getByTestId('password-input-message')).toHaveTextContent(SHORT_PASSWORD_MESSAGE);

            fireEvent.change(emailInput, { target: { value: 'foo@bar.com' }});
            fireEvent.change(passwordInput, { target: { value: 'foobar' }});
            fireEvent.click(submitButton);
            expect(getByTestId('password-input-message')).toBeInTheDocument();
            expect(getByTestId('password-input-message')).toHaveTextContent(SHORT_PASSWORD_MESSAGE);
        });
    })

    it('it should handle redirect correctly, when submit is OK', async () => {
        const redirectURL = "/"
        const mockRouter = { replace: vi.fn(), pathname: '/' };
        (useRouter as Mock).mockReturnValue(mockRouter);

        server.use(
            http.post('/api/login', () => new HttpResponse(null, {
            status: 303,
            headers: {
                Location: redirectURL,
            }
        })), http.get(redirectURL, () => new HttpResponse(null, {})))

        const {getByTestId} = render(<LoginPage />);

        await waitFor(() => {
            const emailInput = getByTestId('email-input');
            expect(emailInput).toBeInTheDocument();

            const passwordInput = getByTestId('password-input');
            expect(passwordInput).toBeInTheDocument();

            const submitButton = getByTestId('submit-button');
            expect(submitButton).toBeInTheDocument();

            fireEvent.change(emailInput, { target: { value: 'foo@bar.com' }});
            fireEvent.change(passwordInput, { target: { value: 'foobarquxabcd' }});
            fireEvent.click(submitButton);

            expect(getByTestId('error-message')).toBeEmptyDOMElement();
            expect(mockRouter.replace).toHaveBeenCalledWith(expect.stringContaining(redirectURL))
        });
    })

    it('it should handle 401 error correctly', async () => {
        const mockRouter = { replace: vi.fn(), pathname: '/' };
        (useRouter as Mock).mockReturnValue(mockRouter);
        server.use(http.post('/api/login', () => new HttpResponse(UNAUTHORIZED_MESSAGE, {
            status: 401,
        })))

        const {getByTestId} = render(<LoginPage />);

        await waitFor(() => {
            const emailInput = getByTestId('email-input');
            expect(emailInput).toBeInTheDocument();

            const passwordInput = getByTestId('password-input');
            expect(passwordInput).toBeInTheDocument();

            const submitButton = getByTestId('submit-button');
            expect(submitButton).toBeInTheDocument();

            fireEvent.change(emailInput, { target: { value: 'foo@bar.com' }});
            fireEvent.change(passwordInput, { target: { value: 'foobarquxabcd' }});
            fireEvent.click(submitButton);

            expect(getByTestId('error-message')).toHaveTextContent(UNAUTHORIZED_MESSAGE);
            expect(mockRouter.replace).toHaveBeenCalledTimes(0)
        });
    })

    it('it should handle 401 error correctly', async () => {
        const mockRouter = { replace: vi.fn(), pathname: '/' };
        (useRouter as Mock).mockReturnValue(mockRouter);
        server.use(http.post('/api/login', () => new HttpResponse(FORBIDDEN_MESSAGE, {
            status: 403,
        })))

        const {getByTestId} = render(<LoginPage />);

        await waitFor(() => {
            const emailInput = getByTestId('email-input');
            expect(emailInput).toBeInTheDocument();

            const passwordInput = getByTestId('password-input');
            expect(passwordInput).toBeInTheDocument();

            const submitButton = getByTestId('submit-button');
            expect(submitButton).toBeInTheDocument();

            fireEvent.change(emailInput, { target: { value: 'foo@bar.com' }});
            fireEvent.change(passwordInput, { target: { value: 'foobarquxabcd' }});
            fireEvent.click(submitButton);

            expect(getByTestId('error-message')).toHaveTextContent(FORBIDDEN_MESSAGE);
            expect(mockRouter.replace).toHaveBeenCalledTimes(0)
        });
    })



    it('it should handle 401 error correctly', async () => {
        const mockRouter = { replace: vi.fn(), pathname: '/' };
        (useRouter as Mock).mockReturnValue(mockRouter);
        server.use(http.post('/api/login', () => new HttpResponse(INTERNAL_SERVER_ERROR_MESSAGE, {
            status: 500,
        })))

        const {getByTestId} = render(<LoginPage />);

        await waitFor(() => {
            const emailInput = getByTestId('email-input');
            expect(emailInput).toBeInTheDocument();

            const passwordInput = getByTestId('password-input');
            expect(passwordInput).toBeInTheDocument();

            const submitButton = getByTestId('submit-button');
            expect(submitButton).toBeInTheDocument();

            fireEvent.change(emailInput, { target: { value: 'foo@bar.com' }});
            fireEvent.change(passwordInput, { target: { value: 'foobarquxabcd' }});
            fireEvent.click(submitButton);

            expect(getByTestId('error-message')).toHaveTextContent(INTERNAL_SERVER_ERROR_MESSAGE);
            expect(mockRouter.replace).toHaveBeenCalledTimes(0)
        });
    })
});