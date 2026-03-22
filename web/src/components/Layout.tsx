import { Navbar } from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

export function Layout() {
    return (
        <div className="min-h-screen bg-[#1A1A1A] text-gray-300 font-sans">
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    )
}
