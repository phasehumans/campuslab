import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const codemirrorState = path.resolve(path.dirname(require.resolve('@codemirror/state')), '..')
const codemirrorView = path.resolve(path.dirname(require.resolve('@codemirror/view')), '..')

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        dedupe: ['@codemirror/state', '@codemirror/view', 'react', 'react-dom'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@codemirror/state': codemirrorState,
            '@codemirror/view': codemirrorView,
        },
    },
    optimizeDeps: {
        include: [
            '@codemirror/state',
            '@codemirror/view',
            '@codemirror/language',
            '@codemirror/commands',
            '@uiw/react-codemirror',
            '@codemirror/lang-cpp',
        ],
    },
    server: {
        hmr: process.env.DISABLE_HMR !== 'true',
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
})
