import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@': path.resolve(__dirname, "./src"),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        "@actions": path.resolve(__dirname, 'src/actions'),
        "@models": path.resolve(__dirname, 'src/models'),
        "@utils": path.resolve(__dirname, 'src/utils'),
        "@contexts": path.resolve(__dirname, 'src/contexts'),
    }
  }
})
