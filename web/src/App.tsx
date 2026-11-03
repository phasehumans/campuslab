/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { AuthProvider } from './contexts/AuthContext'
import { ErrorBoundary } from './components/ErrorBoundary'

import { SolveScreen } from './pages/SolveScreen'

const ProblemSet = lazy(() => import('./pages/ProblemSet').then(m => ({ default: m.ProblemSet })))
const Contest = lazy(() => import('./pages/Contest').then(m => ({ default: m.Contest })))
const ContestRoom = lazy(() => import('./pages/ContestRoom').then(m => ({ default: m.ContestRoom })))
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })))

const Loading = () => (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3E6FC3]"></div>
    </div>
)

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ErrorBoundary>
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route element={<Layout />}>
                                <Route path="/practice" element={<ProblemSet />} />
                                <Route path="/contest" element={<Contest />} />
                                <Route path="/contest/:roomId" element={<ContestRoom />} />
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                            <Route path="/problem/:id" element={<SolveScreen />} />
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            </BrowserRouter>
        </AuthProvider>
    )
}
