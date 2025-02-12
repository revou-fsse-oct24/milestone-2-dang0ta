// src/test/setup-tests.ts (adjust path if needed)
import { server } from './src/__mocks__/server' // Import the mock server
import { beforeAll, afterEach, afterAll } from 'vitest'

// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't interfere with other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())

import '@testing-library/jest-dom/vitest'