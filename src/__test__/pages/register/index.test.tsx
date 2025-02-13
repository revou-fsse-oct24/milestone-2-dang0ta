import RegisterPage from '@/pages/register';
import { server } from "@/__mocks__/server";
import { describe, it, expect, vi, Mock } from 'vitest'
import { http, HttpResponse } from 'msw';
import { useRouter } from 'nextjs-toploader/app';
import { fireEvent, waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { INVALID_EMAIL_ADDRESS_MESSAGE, INVALID_USER_NAME_MESSAGE, SHORT_PASSWORD_MESSAGE } from '@/models/user-information';
import { INTERNAL_SERVER_ERROR, INVALID_USER_INFORMATION } from '@/pages/api/register';

vi.mock('nextjs-toploader/app', () => ({
    useRouter: vi.fn(),
}))

describe('common cases, happy path', () => {
    it('shouldn\'t submit when all fields are empty, and form validation message is displayed', async () => {

        server.use(http.post('/api/register', () => new HttpResponse(null, {
            status: 307,
            headers: {
                Location: '/login'
            }
        })))

        const mockRouter = { replace: vi.fn(), pathname: '/' };
        (useRouter as Mock).mockReturnValue(mockRouter);

        const {getByTestId} = render(<RegisterPage />)

        await waitFor(() => {
            const usernameInput = getByTestId('user-name-input');
            expect(usernameInput).toBeInTheDocument();

            const emailInput = getByTestId('email-input');
            expect(emailInput).toBeInTheDocument();

            const passwordInput = getByTestId('password-input');
            expect(passwordInput).toBeInTheDocument();

            const submitButton = getByTestId('submit-button');
            expect(submitButton).toBeInTheDocument();

            fireEvent.click(submitButton);
            expect(getByTestId('user-name-input-message')).toBeInTheDocument();
            expect(getByTestId('user-name-input-message')).toHaveTextContent(INVALID_USER_NAME_MESSAGE);

            expect(getByTestId('email-input-message')).toBeInTheDocument();
            expect(getByTestId('email-input-message')).toHaveTextContent(INVALID_EMAIL_ADDRESS_MESSAGE);

            expect(getByTestId('password-input-message')).toBeInTheDocument();
            expect(getByTestId('password-input-message')).toHaveTextContent(SHORT_PASSWORD_MESSAGE);

            expect(mockRouter.replace).not.toHaveBeenCalled();
        })

    });

    it('should redirect to /login when registration is successful', async () => {
        server.use(http.post('/api/register', () => new HttpResponse(null, {
            status: 303,
            headers: {
                Location: '/login'
            }
        })), http.get("/login", () => new HttpResponse(null, {status: 200})))

        const mockRouter = { replace: vi.fn(), pathname: '/' };
        (useRouter as Mock).mockReturnValue(mockRouter);

        const {getByTestId} = render(<RegisterPage />)

        await waitFor(() => {
            const usernameInput = getByTestId('user-name-input');
            fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
            expect(usernameInput).toBeInTheDocument();

            const emailInput = getByTestId('email-input');
            fireEvent.change(emailInput, { target: { value: 'johndoe@shopmart.com'} });
            expect(emailInput).toBeInTheDocument();

            const passwordInput = getByTestId('password-input');
            fireEvent.change(passwordInput, { target: { value: 'foobarbaz'} });
            expect(passwordInput).toBeInTheDocument();

            const submitButton = getByTestId('submit-button');
            expect(submitButton).toBeInTheDocument();

            fireEvent.click(submitButton);

            expect(mockRouter.replace).toHaveBeenCalledWith('http://localhost:3000/login');
        })
    });

    it('show error if the server responded with 400', async () => {
        server.use(http.post('/api/register', () => new HttpResponse(INVALID_USER_INFORMATION, {
            status: 400,
        })), http.get("/login", () => new HttpResponse(null, {status: 200})))

        const mockRouter = { replace: vi.fn(), pathname: '/' };
        (useRouter as Mock).mockReturnValue(mockRouter);

        const {getByTestId} = render(<RegisterPage />)

        await waitFor(() => {
            const usernameInput = getByTestId('user-name-input');
            fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
            expect(usernameInput).toBeInTheDocument();

            const emailInput = getByTestId('email-input');
            fireEvent.change(emailInput, { target: { value: 'johndoe@shopmart.com'} });
            expect(emailInput).toBeInTheDocument();

            const passwordInput = getByTestId('password-input');
            fireEvent.change(passwordInput, { target: { value: 'foobarbaz'} });
            expect(passwordInput).toBeInTheDocument();

            const submitButton = getByTestId('submit-button');
            expect(submitButton).toBeInTheDocument();

            fireEvent.click(submitButton);

            expect(getByTestId('error-message')).toBeInTheDocument();
            expect(getByTestId('error-message')).toHaveTextContent(INVALID_USER_INFORMATION);
        })
    });

    it('show error if the server responded with 500', async () => {
        server.use(http.post('/api/register', () => new HttpResponse(INTERNAL_SERVER_ERROR, {
            status: 500,
        })), http.get("/login", () => new HttpResponse(null, {status: 200})))

        const mockRouter = { replace: vi.fn(), pathname: '/' };
        (useRouter as Mock).mockReturnValue(mockRouter);

        const {getByTestId} = render(<RegisterPage />)

        await waitFor(() => {
            const usernameInput = getByTestId('user-name-input');
            fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
            expect(usernameInput).toBeInTheDocument();

            const emailInput = getByTestId('email-input');
            fireEvent.change(emailInput, { target: { value: 'johndoe@shopmart.com'} });
            expect(emailInput).toBeInTheDocument();

            const passwordInput = getByTestId('password-input');
            fireEvent.change(passwordInput, { target: { value: 'foobarbaz'} });
            expect(passwordInput).toBeInTheDocument();

            const submitButton = getByTestId('submit-button');
            expect(submitButton).toBeInTheDocument();

            fireEvent.click(submitButton);

            expect(getByTestId('error-message')).toBeInTheDocument();
            expect(getByTestId('error-message')).toHaveTextContent(INTERNAL_SERVER_ERROR);
        })
    });

    it('show error if there\'s client error', async () => {
        server.use(http.post('/api/register', () => Promise.reject('test error')), http.get("/login", () => new HttpResponse(null, {status: 200})))

        const mockRouter = { replace: vi.fn(), pathname: '/' };
        (useRouter as Mock).mockReturnValue(mockRouter);

        const {getByTestId} = render(<RegisterPage />)

        await waitFor(() => {
            const usernameInput = getByTestId('user-name-input');
            fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
            expect(usernameInput).toBeInTheDocument();

            const emailInput = getByTestId('email-input');
            fireEvent.change(emailInput, { target: { value: 'johndoe@shopmart.com'} });
            expect(emailInput).toBeInTheDocument();

            const passwordInput = getByTestId('password-input');
            fireEvent.change(passwordInput, { target: { value: 'foobarbaz'} });
            expect(passwordInput).toBeInTheDocument();

            const submitButton = getByTestId('submit-button');
            expect(submitButton).toBeInTheDocument();

            fireEvent.click(submitButton);

            expect(getByTestId('error-message')).toBeInTheDocument();
            expect(getByTestId('error-message')).toHaveTextContent('test error');
        })
    });
})