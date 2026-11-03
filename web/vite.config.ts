import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const codemirrorState = path.resolve(path.dirname(require.resolve('@codemirror/state')), '..')
const codemirrorView = path.resolve(path.dirname(require.resolve('@codemirror/view')), '..')

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '')
    return {
        plugins: [react(), tailwindcss()],
        define: {
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        },
        resolve: {
            dedupe: [
                '@codemirror/state',
                '@codemirror/view',
                'react',
                'react-dom',
            ],
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
                '@codemirror/lang-python',
                '@codemirror/lang-java',
                '@codemirror/lang-rust',
            ],
        },
        server: {
            // HMR is disabled in AI Studio via DISABLE_HMR env var.
            // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
            hmr: process.env.DISABLE_HMR !== 'true',
        },
    }
})
