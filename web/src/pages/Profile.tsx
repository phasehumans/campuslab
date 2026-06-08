import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { getApiErrorMessage, getProfile } from '@/lib/api'
import { UserInfo } from '@/components/profile/UserInfo'
import { StatsGrid } from '@/components/profile/StatsGrid'
import { AnalyticsCard } from '@/components/profile/AnalyticsCard'
import { RecentSubmissions } from '@/components/profile/RecentSubmissions'

export function Profile() {
    const { isLoggedIn, isAuthLoading, logout, openModal } = useAuth()
    const navigate = useNavigate()

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        enabled: isLoggedIn,
    })

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    if (isAuthLoading) {
        return <div className="py-12 text-sm text-slate-400 font-semibold">Loading profile...</div>
    }

    if (!isLoggedIn) {
        return (
            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
                <h1 className="text-xl font-bold text-slate-800">Login Required</h1>
                <p className="mt-3 text-sm text-slate-400 font-medium">
                    Sign in to view your solved problems, submission history, and contest progress.
                </p>
                <button
                    onClick={() => openModal('login')}
                    className="mt-6 rounded-xl bg-[#3E6FC3] hover:bg-[#325a9e] px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-md shadow-blue-500/10"
                >
                    Sign In
                </button>
            </div>
        )
    }

    if (profileQuery.isLoading) {
        return <div className="py-12 text-sm text-slate-400 font-semibold">Loading profile...</div>
    }

    if (profileQuery.isError || !profileQuery.data) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">
                {getApiErrorMessage(profileQuery.error, 'Unable to load profile')}
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 py-8 px-4">
            <UserInfo user={profileQuery.data.user} handleLogout={handleLogout} />
            <div className="md:col-span-8 space-y-6">
                <StatsGrid stats={profileQuery.data.stats} />
                <AnalyticsCard submissions={profileQuery.data.recentSubmissions} />
                <RecentSubmissions submissions={profileQuery.data.recentSubmissions} />
            </div>
        </div>
    )
}
