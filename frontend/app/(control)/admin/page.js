'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAppContext from '@/hooks/useAppContext';
import { getAdminStats } from '@/actions/admin';
import { FaUsers, FaFileAlt, FaChartLine, FaCrown, FaRocket, FaLock } from 'react-icons/fa';
import MatrixBackground from '@/components/effects/matrix-background';

// Stat Card Component
function StatCard({ icon: Icon, label, value, color, subtext }) {
    return (
        <div className="relative bg-[#111316] border border-[#2a2d32] rounded-2xl p-6 overflow-hidden group hover:border-[#2EFF8A]/50 transition-all">
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />

            <div className="relative flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
                    <Icon className="text-white text-2xl" />
                </div>
                <div>
                    <p className="text-[#9AA3A8] text-sm">{label}</p>
                    <p className="text-[#E6E9EB] text-3xl font-bold">{value}</p>
                    {subtext && <p className="text-[#2EFF8A] text-xs mt-1">{subtext}</p>}
                </div>
            </div>
        </div>
    );
}

// Top Users Leaderboard
function Leaderboard({ users }) {
    const medals = ['🥇', '🥈', '🥉'];

    return (
        <div className="bg-[#111316] border border-[#2a2d32] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#E6E9EB] mb-4 flex items-center gap-2">
                <FaCrown className="text-yellow-500" />
                Top CV Builders
            </h3>
            <div className="space-y-3">
                {users?.length > 0 ? users.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#0f1113] rounded-xl hover:bg-[#1a1d21] transition-colors">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{medals[index] || `#${index + 1}`}</span>
                            <span className="text-[#9AA3A8] font-mono text-sm">{user.email}</span>
                        </div>
                        <span className="text-[#2EFF8A] font-bold">{user.cv_count} CVs</span>
                    </div>
                )) : (
                    <p className="text-[#9AA3A8] text-center py-4">No users yet! 🦗</p>
                )}
            </div>
        </div>
    );
}

// Fun Messages Component
function FunMessage({ message }) {
    return (
        <div className="bg-gradient-to-r from-[#2EFF8A]/10 to-[#2EFF8A]/5 border border-[#2EFF8A]/30 rounded-2xl p-6 text-center">
            <p className="text-2xl font-bold text-[#2EFF8A]">{message}</p>
        </div>
    );
}

// Activity Chart (Simple ASCII-style bar chart)
function ActivityChart({ data }) {
    const maxCount = data?.length > 0 ? Math.max(...data.map(d => d.count)) : 0;

    return (
        <div className="bg-[#111316] border border-[#2a2d32] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#E6E9EB] mb-4 flex items-center gap-2">
                <FaChartLine className="text-[#2EFF8A]" />
                New Users (Last 7 Days)
            </h3>
            <div className="space-y-2">
                {data?.length > 0 ? data.map((day, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <span className="text-[#9AA3A8] text-xs w-20 font-mono">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        <div className="flex-1 bg-[#0f1113] rounded-full h-6 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#2EFF8A] to-[#26d975] rounded-full flex items-center justify-end pr-2 transition-all"
                                style={{ width: `${maxCount > 0 ? (day.count / maxCount) * 100 : 0}%`, minWidth: day.count > 0 ? '40px' : '0' }}
                            >
                                <span className="text-[#0f1113] text-xs font-bold">{day.count}</span>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p className="text-[#9AA3A8] text-center py-4">No data yet! Build it and they will come... 🏗️</p>
                )}
            </div>
        </div>
    );
}

import { getEmailAndName } from '@/lib/utils';

// ...

export default function AdminPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAppContext();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchStats() {
            // Check cookies directly to avoid race condition with AppProvider
            const { isAuthenticated: hasCookie, isAdmin: isCookieAdmin } = getEmailAndName();

            // Check if user is admin
            if (!hasCookie) {
                router.push('/');
                return;
            }

            if (!isCookieAdmin) {
                setError("Nice try! 😏 But you're not an admin.");
                setLoading(false);
                return;
            }

            const result = await getAdminStats();
            if (result.success) {
                setStats(result.data);
            } else {
                setError(result.message || "Failed to load stats");
            }
            setLoading(false);
        }

        fetchStats();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#2EFF8A] mx-auto mb-4" />
                    <p className="text-[#9AA3A8]">Loading admin secrets... 🔐</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center bg-[#111316] border border-red-500/30 rounded-2xl p-8 max-w-md">
                    <FaLock className="text-red-500 text-6xl mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-[#E6E9EB] mb-2">Access Denied</h1>
                    <p className="text-[#9AA3A8]">{error}</p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="mt-6 px-6 py-2 bg-[#2EFF8A] text-[#0f1113] font-bold rounded-full hover:bg-[#26d975] transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            <MatrixBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2EFF8A]/10 border border-[#2EFF8A]/30 rounded-full mb-4">
                        <FaRocket className="text-[#2EFF8A]" />
                        <span className="text-[#2EFF8A] font-medium">Admin Control Center</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#E6E9EB] mb-2">
                        Welcome back, <span className="text-[#2EFF8A]">Boss</span> 👑
                    </h1>
                    <p className="text-[#9AA3A8]">Here&apos;s what&apos;s happening with cv.craft</p>
                </div>

                {/* Fun Message */}
                {stats?.fun_message && (
                    <div className="mb-8">
                        <FunMessage message={stats.fun_message} />
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={FaUsers}
                        label="Total Users"
                        value={stats?.total_users || 0}
                        color="from-blue-500 to-blue-600"
                        subtext={`+${stats?.new_users_7_days || 0} this week`}
                    />
                    <StatCard
                        icon={FaFileAlt}
                        label="Total CVs"
                        value={stats?.total_cvs || 0}
                        color="from-green-500 to-green-600"
                        subtext={`+${stats?.new_cvs_7_days || 0} this week`}
                    />
                    <StatCard
                        icon={FaChartLine}
                        label="Avg CVs/User"
                        value={stats?.avg_cvs_per_user || 0}
                        color="from-purple-500 to-purple-600"
                    />
                    <StatCard
                        icon={FaCrown}
                        label="Top Builder"
                        value={stats?.top_users?.[0]?.cv_count || 0}
                        color="from-yellow-500 to-orange-500"
                        subtext="CVs by #1 user"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <ActivityChart data={stats?.users_by_day || []} />
                    <Leaderboard users={stats?.top_users || []} />
                </div>

                {/* Potential Insights Section (Coming Soon) */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-[#E6E9EB] mb-6 flex items-center gap-2">
                        <FaRocket className="text-purple-500" />
                        Future Insights (Coming Soon)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Insight Card 1 */}
                        <div className="bg-[#111316] border border-[#2a2d32] border-dashed rounded-2xl p-6 opacity-70 hover:opacity-100 transition-opacity">
                            <h4 className="text-[#2EFF8A] font-bold mb-2">🔥 Top Skills</h4>
                            <p className="text-[#9AA3A8] text-sm">See which skills are most popular among your users. (e.g., Python, React, AWS)</p>
                        </div>
                        {/* Insight Card 2 */}
                        <div className="bg-[#111316] border border-[#2a2d32] border-dashed rounded-2xl p-6 opacity-70 hover:opacity-100 transition-opacity">
                            <h4 className="text-[#2EFF8A] font-bold mb-2">💼 Job Market</h4>
                            <p className="text-[#9AA3A8] text-sm">Analyze the most common job roles users are applying for.</p>
                        </div>
                        {/* Insight Card 3 */}
                        <div className="bg-[#111316] border border-[#2a2d32] border-dashed rounded-2xl p-6 opacity-70 hover:opacity-100 transition-opacity">
                            <h4 className="text-[#2EFF8A] font-bold mb-2">🌍 User Map</h4>
                            <p className="text-[#9AA3A8] text-sm">Visual heatmap of where your users are located.</p>
                        </div>
                    </div>
                </div>

                {/* Fun Footer */}
                <div className="text-center text-[#9AA3A8] text-sm mt-12 mb-8">
                    <p>🤖 ATS bots destroyed today: <span className="text-[#2EFF8A] font-bold">∞</span></p>
                    <p className="mt-2 text-xs opacity-50">* "Total CVs" now excludes unmodified templates. Only real hustlers counted.</p>
                </div>
            </div>
        </div>
    );
}
