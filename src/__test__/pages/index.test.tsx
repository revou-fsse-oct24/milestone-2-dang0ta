import Page  from '@/pages';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { useRouter } from 'nextjs-toploader/app';
import { render } from '@testing-library/react';

vi.mock('nextjs-toploader/app', () => ({
    useRouter: vi.fn(),
}));

describe('index page test', () => {
    const mockRouter = { push: vi.fn() };
    beforeEach(() => {
        (useRouter as Mock).mockReturnValue(mockRouter);
    });

    afterEach(() => {
        mockRouter.push.mockClear();    
    })

    it('should redirect to /shop', async() => {
        render(<Page />);

        expect(mockRouter.push).toHaveBeenCalledWith('/shop');
    })
})

