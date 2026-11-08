import { Navbar } from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

export function Layout() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#141414] text-[#090a0f] dark:text-[#e8e8e6] font-sans flex flex-col selection:bg-[#87b2f4] selection:text-[#0a1128] transition-colors">
            <Navbar />
            <main className="flex-1 w-full mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 py-3.5 flex flex-col">
                <Outlet />
            </main>
        </div>
    )
}
