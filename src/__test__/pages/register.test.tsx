import RegisterPage from '@/pages/register';
import { server } from "@/__mocks__/server";
import { describe, it, expect, vi, Mock, beforeEach } from 'vitest'
import { http, HttpResponse } from 'msw';
import { useRouter } from 'nextjs-toploader/app';
import { fireEvent, waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { INVALID_EMAIL_ADDRESS_MESSAGE, INVALID_USER_NAME_MESSAGE, SHORT_PASSWORD_MESSAGE } from '@/models/user-information';
import { INTERNAL_SERVER_ERROR, INVALID_USER_INFORMATION } from '@/pages/api/register';

vi.mock('nextjs-toploader/app', () => ({
    useRouter: vi.fn(),
}))

describe('RegisterPage', () => {
    let mockRouter: { replace: Mock; pathname: string };

    beforeEach(() => {
        mockRouter = { replace: vi.fn(), pathname: '/' };
        (useRouter as Mock).mockReturnValue(mockRouter);
    });

    it('shouldn\'t submit when all fields are empty, and form validation message is displayed', async () => {
        server.use(http.post('/api/register', () => new HttpResponse(null, {
            status: 307,
            headers: {
                Location: '/login'
            }
        })))

        const { getByTestId } = render(<RegisterPage />)

        await waitFor(() => {
            const submitButton = getByTestId('submit-button');
            fireEvent.click(submitButton);
        });

        expect(getByTestId('user-name-input-message')).toHaveTextContent(INVALID_USER_NAME_MESSAGE);
        expect(getByTestId('email-input-message')).toHaveTextContent(INVALID_EMAIL_ADDRESS_MESSAGE);
        expect(getByTestId('password-input-message')).toHaveTextContent(SHORT_PASSWORD_MESSAGE);
        expect(mockRouter.replace).not.toHaveBeenCalled();
    });

    it('should redirect to /login when registration is successful', async () => {
        server.use(http.post('/api/register', () => new HttpResponse(null, {
            status: 303,
            headers: {
                Location: '/login'
            }
        })), http.get("/login", () => new HttpResponse(null, { status: 200 })))

        const { getByTestId } = render(<RegisterPage />)

        await waitFor(() => {
            fireEvent.change(getByTestId('user-name-input'), { target: { value: 'John Doe' } });
            fireEvent.change(getByTestId('email-input'), { target: { value: 'johndoe@shopmart.com' } });
            fireEvent.change(getByTestId('password-input'), { target: { value: 'foobarbaz' } });
            fireEvent.click(getByTestId('submit-button'));
        });

        expect(mockRouter.replace).toHaveBeenCalledWith('http://localhost:3000/login');
    });

    it('should show error if the server responded with 400', async () => {
        server.use(http.post('/api/register', () => new HttpResponse(INVALID_USER_INFORMATION, {
            status: 400,
        })))

        const { getByTestId } = render(<RegisterPage />)

        await waitFor(() => {
            fireEvent.change(getByTestId('user-name-input'), { target: { value: 'John Doe' } });
            fireEvent.change(getByTestId('email-input'), { target: { value: 'johndoe@shopmart.com' } });
            fireEvent.change(getByTestId('password-input'), { target: { value: 'foobarbaz' } });
            fireEvent.click(getByTestId('submit-button'));
        });

        expect(getByTestId('error-message')).toHaveTextContent(INVALID_USER_INFORMATION);
    });

    it('should show error if the server responded with 500', async () => {
        server.use(http.post('/api/register', () => new HttpResponse(INTERNAL_SERVER_ERROR, {
            status: 500,
        })))

        const { getByTestId } = render(<RegisterPage />)

        await waitFor(() => {
            fireEvent.change(getByTestId('user-name-input'), { target: { value: 'John Doe' } });
            fireEvent.change(getByTestId('email-input'), { target: { value: 'johndoe@shopmart.com' } });
            fireEvent.change(getByTestId('password-input'), { target: { value: 'foobarbaz' } });
            fireEvent.click(getByTestId('submit-button'));
        });

        expect(getByTestId('error-message')).toHaveTextContent(INTERNAL_SERVER_ERROR);
    });

    it('should show error if there\'s client error', async () => {
        server.use(http.post('/api/register', () => Promise.reject('test error')))

        const { getByTestId } = render(<RegisterPage />)

        await waitFor(() => {
            fireEvent.change(getByTestId('user-name-input'), { target: { value: 'John Doe' } });
            fireEvent.change(getByTestId('email-input'), { target: { value: 'johndoe@shopmart.com' } });
            fireEvent.change(getByTestId('password-input'), { target: { value: 'foobarbaz' } });
            fireEvent.click(getByTestId('submit-button'));
        });

        expect(getByTestId('error-message')).toHaveTextContent('test error');
    });
});