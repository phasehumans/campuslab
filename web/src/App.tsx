/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from './components/Layout'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SolveScreen } from './pages/SolveScreen'
import { OAuthCallback } from './pages/OAuthCallback'

const ProblemSet = lazy(() => import('./pages/ProblemSet').then((m) => ({ default: m.ProblemSet })))
const ContestRoom = lazy(() =>
    import('./pages/ContestRoom').then((m) => ({ default: m.ContestRoom }))
)

function HomeRoute() {
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (code && state === 'google') {
        return <OAuthCallback provider="google" customRedirectUri={window.location.origin} />
    }

    return <ProblemSet />
}

const Loading = () => (
    <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-[#141414] font-mono text-xs text-[#94a3b8] dark:text-[#a09f9d]">
        <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#e2e8f0] dark:border-[#333333] border-t-[#87b2f4]"></div>
            <span>loading campuslab...</span>
        </div>
    </div>
)

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <ErrorBoundary>
                        <Suspense fallback={<Loading />}>
                            <Routes>
                                {/* Main App Layout */}
                                <Route element={<Layout />}>
                                    <Route path="/" element={<HomeRoute />} />
                                    <Route path="/contest/:roomId" element={<ContestRoom />} />

                                    {/* OAuth Callbacks */}
                                    <Route
                                        path="/auth/callback/github"
                                        element={<OAuthCallback provider="github" />}
                                    />
                                    <Route
                                        path="/auth/callback/google"
                                        element={<OAuthCallback provider="google" />}
                                    />

                                    {/* Redirect legacy routes directly to root */}
                                    <Route path="/login" element={<Navigate to="/" replace />} />
                                    <Route path="/practice" element={<Navigate to="/" replace />} />
                                    <Route path="/contest" element={<Navigate to="/" replace />} />
                                    <Route path="/profile" element={<Navigate to="/" replace />} />
                                </Route>

                                {/* Fullscreen Code Editor IDE */}
                                <Route path="/problem/:id" element={<SolveScreen />} />

                                {/* Fallback */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </Suspense>
                    </ErrorBoundary>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    )
}
