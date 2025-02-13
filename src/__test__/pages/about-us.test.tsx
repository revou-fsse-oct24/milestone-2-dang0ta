import Page  from '@/pages/about-us';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe("about us test", () => {
    it("should contain title, subtitle, mission, technologies, and contact", () => {
        const { getByTestId } = render(<Page />);
        expect(getByTestId('title')).toBeInTheDocument();
        expect(getByTestId('subtitle')).toBeInTheDocument();
        expect(getByTestId('mission')).toBeInTheDocument();
        expect(getByTestId('technologies')).toBeInTheDocument();
        expect(getByTestId('contact')).toBeInTheDocument();
    })
})