import { Navbar } from '@/components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'

export function Layout() {
    const location = useLocation()
    const hideGrid =
        location.pathname.startsWith('/practice') ||
        location.pathname.startsWith('/contest') ||
        location.pathname.startsWith('/profile')

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans relative overflow-x-hidden">
            {/* Highly visible background grid like Landing Page */}
            {!hideGrid && (
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                    }}
                />
            )}
            <div className="relative z-10">
                <Navbar />
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
