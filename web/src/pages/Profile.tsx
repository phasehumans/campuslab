import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { UserInfo } from '@/components/profile/UserInfo'
import { StatsGrid } from '@/components/profile/StatsGrid'
import { RecentSubmissions } from '@/components/profile/RecentSubmissions'

export function Profile() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 py-8 px-4">
            {/* Left Sidebar - User Info */}
            <UserInfo handleLogout={handleLogout} />

            {/* Main Content */}
            <div className="md:col-span-8 space-y-6">
                {/* Stats Grid */}
                <StatsGrid />

                {/* Recent Submissions */}
                <RecentSubmissions />
            </div>
        </div>
    )
}
