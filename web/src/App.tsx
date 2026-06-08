/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProblemSet } from './pages/ProblemSet'
import { Contest } from './pages/Contest'
import { ContestRoom } from './pages/ContestRoom'
import { Profile } from './pages/Profile'
import { SolveScreen } from './pages/SolveScreen'
import { LandingPage } from './pages/LandingPage'
import { AuthProvider } from './contexts/AuthContext'

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
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
            </BrowserRouter>
        </AuthProvider>
    )
}
