import UserPage, { getServerSideProps, Props } from "@/pages/user";
import { useRouter } from "nextjs-toploader/app";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { createPropContext } from "../util";
import { render } from "@testing-library/react";

import { server } from "@/__mocks__/server";
import { http, HttpResponse } from 'msw';
import { getUserByIDURL, getUserURL } from "@/actions/api";
import { defaultUser, User } from "@/models/user";


vi.mock('nextjs-toploader/app', () => ({
    useRouter: vi.fn(),
}));

describe('user page test', () => {
    const mockRouter = { push: vi.fn() };
    beforeEach(() => {
        (useRouter as Mock).mockReturnValue(mockRouter);
    });

    afterEach(() => {
        mockRouter.push.mockClear();    
    })

    it('should render the user form if there\'s an authenticated user', async () => {
        const user = defaultUser();
        server.use(http.get(getUserURL(), () => {
            return HttpResponse.json(user);
        }));

        const { props } = await getServerSideProps(createPropContext('/user', {auth_token: 'test-token'}));
        const { getByTestId } = render(<UserPage {...(props as Props)} />);

        expect(getByTestId('user-avatar')).toBeInTheDocument();
        expect(getByTestId('user-name')).toBeInTheDocument();
        expect(getByTestId('user-name')).toHaveTextContent(user.name);
        expect(getByTestId('user-role-email')).toBeInTheDocument();
        expect(getByTestId('user-role-email')).toHaveTextContent(`${user.role} ${user.email}`);
        expect(getByTestId('username-input')).toBeInTheDocument();
        expect(getByTestId('email-input')).toBeInTheDocument();
        expect(getByTestId('user-form')).toHaveFormValues({name: user.name, email: user.email});
    })

    it('should render redirect to login page if there\'s no authenticated user', async () => {
        const user = defaultUser();
        server.use(http.get(getUserURL(), () => {
            return HttpResponse.json(user);
        }));

        const { redirect } = await getServerSideProps(createPropContext('/user'));
        expect(redirect).toBeTruthy();
        expect(redirect?.destination).toBe('/login');
        expect(redirect?.permanent).toBe(false);
    })

    it('should render redirect to login page if there\'s an error while getting current user', async () => {
        server.use(http.get(getUserURL(), () => {
            return HttpResponse.text('test-error', {status: 500});
        }));

        const { redirect } = await getServerSideProps(createPropContext('/user', {auth_token: 'test-token'}));
        expect(redirect).toBeTruthy();
        expect(redirect?.destination).toBe('/login');
        expect(redirect?.permanent).toBe(false);
    })


})