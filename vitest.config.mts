import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
        reporter: ['text'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/*.test.{ts,tsx}', 'src/__test__/**/*.*', 'src/__mocks__/**/*.*'],
    },
    environment: 'happy-dom', // Use happy-dom
    globals: true,
    include: ['**/*.test.{ts,tsx}'], // Adjust to your test file pattern
    setupFiles: ['./setup-tests.ts'], // Optional: For global setup
  },
})