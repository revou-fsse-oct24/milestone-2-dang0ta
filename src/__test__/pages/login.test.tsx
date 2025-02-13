import { fireEvent, render, waitFor } from '@testing-library/react';
import LoginPage from '@/pages/login';
import { server } from "@/__mocks__/server";
import { http, HttpResponse } from 'msw';
import { INVALID_EMAIL_ADDRESS_MESSAGE, SHORT_PASSWORD_MESSAGE } from '@/models/login-credential';
import { useRouter } from 'nextjs-toploader/app';
import { FORBIDDEN_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE, UNAUTHORIZED_MESSAGE } from '@/pages/api/login';
import { describe, it, expect, vi, Mock, beforeEach, afterEach } from 'vitest';

vi.mock('nextjs-toploader/app', () => ({
    useRouter: vi.fn(),
}));

describe('Login Page', () => {
    const mockRouter = { replace: vi.fn(), pathname: '/' };

    beforeEach(() => {
        (useRouter as Mock).mockReturnValue(mockRouter);
    });

    afterEach(() => {
        mockRouter.replace.mockReset();
    })

    it('common form validation', async () => {
        server.use(http.post('/api/login', () => new HttpResponse(null, {
            type: 'basic',
            status: 307,
            headers: {
                Location: '/',
            }
        })));

        const { getByTestId } = render(<LoginPage />);

        await waitFor(() => {
            const emailInput = getByTestId('email-input');
            const passwordInput = getByTestId('password-input');
            const submitButton = getByTestId('submit-button');

            fireEvent.click(submitButton);
            expect(getByTestId('email-input-message')).toHaveTextContent(INVALID_EMAIL_ADDRESS_MESSAGE);
            expect(getByTestId('password-input-message')).toHaveTextContent(SHORT_PASSWORD_MESSAGE);

            fireEvent.change(emailInput, { target: { value: 'foo@bar.com' } });
            fireEvent.change(passwordInput, { target: { value: 'foobar' } });
            fireEvent.click(submitButton);
            expect(getByTestId('password-input-message')).toHaveTextContent(SHORT_PASSWORD_MESSAGE);
        });
    });

    it('should handle redirect correctly when submit is OK', async () => {
        const redirectURL = "/";
        server.use(
            http.post('/api/login', () => new HttpResponse(null, {
                status: 303,
                headers: {
                    Location: redirectURL,
                }
            })),
            http.get(redirectURL, () => new HttpResponse(null, {}))
        );

        const { getByTestId } = render(<LoginPage />);

        await waitFor(() => {
            const emailInput = getByTestId('email-input');
            const passwordInput = getByTestId('password-input');
            const submitButton = getByTestId('submit-button');

            fireEvent.change(emailInput, { target: { value: 'foo@bar.com' } });
            fireEvent.change(passwordInput, { target: { value: 'foobarquxabcd' } });
            fireEvent.click(submitButton);

            expect(getByTestId('error-message')).toBeEmptyDOMElement();
            expect(mockRouter.replace).toHaveBeenCalledWith(expect.stringContaining(redirectURL));
        });
    });

    const errorCases = [
        { status: 401, message: UNAUTHORIZED_MESSAGE },
        { status: 403, message: FORBIDDEN_MESSAGE },
        { status: 500, message: INTERNAL_SERVER_ERROR_MESSAGE },
    ];

    errorCases.forEach(({ status, message }) => {
        it(`should handle ${status} error correctly`, async () => {
            server.use(http.post('/api/login', () => new HttpResponse(message, { status })));

            const { getByTestId } = render(<LoginPage />);

            await waitFor(() => {
                const emailInput = getByTestId('email-input');
                const passwordInput = getByTestId('password-input');
                const submitButton = getByTestId('submit-button');

                fireEvent.change(emailInput, { target: { value: 'foo@bar.com' } });
                fireEvent.change(passwordInput, { target: { value: 'foobarquxabcd' } });
                fireEvent.click(submitButton);

                expect(getByTestId('error-message')).toHaveTextContent(message);
                expect(mockRouter.replace).toHaveBeenCalledTimes(0);
            });
        });
    });
});