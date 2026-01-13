'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAppContext from '@/hooks/useAppContext';
import { getAdminStats, deleteFeedback } from '@/actions/admin';
import { FaUsers, FaFileAlt, FaChartLine, FaCrown, FaRocket, FaLock, FaUniversity, FaBriefcase, FaMapMarkerAlt, FaGraduationCap, FaBuilding, FaComment, FaTrash } from 'react-icons/fa';
import MatrixBackground from '@/components/effects/matrix-background';
import { getEmailAndName } from '@/lib/utils';

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
    const medals = ['1st', '2nd', '3rd'];

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
                            <span className="text-xl font-mono text-[#2EFF8A]">{medals[index] || `#${index + 1}`}</span>
                            <span className="text-[#9AA3A8] font-mono text-sm">{user.email}</span>
                        </div>
                        <span className="text-[#E6E9EB] font-bold">{user.cv_count} CVs</span>
                    </div>
                )) : (
                    <p className="text-[#9AA3A8] text-center py-4">No users found.</p>
                )}
            </div>
        </div>
    );
}

// Fun Messages Component (Now cleaner)
function FunMessage({ message }) {
    return (
        <div className="bg-gradient-to-r from-[#2EFF8A]/10 to-[#2EFF8A]/5 border border-[#2EFF8A]/30 rounded-2xl p-6 text-center">
            <p className="text-2xl font-bold text-[#2EFF8A]">{message}</p>
        </div>
    );
}

// Activity Chart
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
                    <p className="text-[#9AA3A8] text-center py-4">No activity data available.</p>
                )}
            </div>
        </div>
    );
}

// Insight Bar Chart Component
function InsightBarChart({ title, data, icon: Icon, color, subtext }) {
    if (!data || data.length === 0) return null;
    const maxVal = Math.max(...data.map(d => d.count));

    return (
        <div className="bg-[#111316] border border-[#2a2d32] rounded-2xl p-6 hover:border-[#2EFF8A]/30 transition-all">
            <h3 className="text-lg font-bold text-[#E6E9EB] mb-4 flex items-center gap-2">
                <Icon className={color} />
                {title}
            </h3>
            {subtext && <p className="text-[#9AA3A8] text-xs mb-4">{subtext}</p>}

            <div className="space-y-3">
                {data.map((item, index) => (
                    <div key={index} className="group">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-[#E6E9EB] font-medium truncate max-w-[70%]">{item.name || item.title || item.year}</span>
                            <span className="text-[#9AA3A8]">{item.count}</span>
                        </div>
                        <div className="h-2 bg-[#0f1113] rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${color.replace('text-', 'bg-')}`}
                                style={{ width: `${(item.count / maxVal) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Simple Stat Pill
function StatPill({ label, value, icon: Icon }) {
    return (
        <div className="flex items-center gap-3 bg-[#111316] border border-[#2a2d32] px-4 py-3 rounded-xl">
            <div className="p-2 bg-[#2EFF8A]/10 rounded-lg text-[#2EFF8A]">
                <Icon />
            </div>
            <div>
                <p className="text-[#9AA3A8] text-xs">{label}</p>
                <p className="text-[#E6E9EB] font-bold">{value}</p>
            </div>
        </div>
    );
}

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
                setError("Access Denied: Admin privileges required.");
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
                    <p className="text-[#9AA3A8]">Authenticating...</p>
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
                        Return to Dashboard
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
                        System <span className="text-[#2EFF8A]">Overview</span>
                    </h1>
                    <p className="text-[#9AA3A8]">Real-time statistics and user analytics</p>
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

                {/* Advanced Insights Grid */}
                {stats?.insights && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-[#E6E9EB] mb-6 flex items-center gap-2">
                            Deep Dive Analytics
                        </h2>

                        {/* Highlights Row */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <StatPill
                                icon={FaGraduationCap}
                                label="Average GPA"
                                value={stats.insights.average_gpa ? `${stats.insights.average_gpa} / 4.0` : "N/A"}
                            />
                            <StatPill
                                icon={FaBuilding}
                                label="Top Job Role"
                                value={stats.insights.top_jobs?.[0]?.title || "N/A"}
                            />
                            <StatPill
                                icon={FaMapMarkerAlt}
                                label="Top Location"
                                value={stats.insights.top_locations?.[0]?.name || "Earth"}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <InsightBarChart
                                title="Top Universities"
                                data={stats.insights.top_universities}
                                icon={FaUniversity}
                                color="text-blue-400"
                            />
                            <InsightBarChart
                                title="Popular Job Titles"
                                data={stats.insights.top_jobs}
                                icon={FaBriefcase}
                                color="text-purple-400"
                            />
                            <InsightBarChart
                                title="User Locations"
                                data={stats.insights.top_locations}
                                icon={FaMapMarkerAlt}
                                color="text-orange-400"
                            />
                            <InsightBarChart
                                title="Graduation Years"
                                data={stats.insights.grad_years}
                                icon={FaGraduationCap}
                                color="text-green-400"
                                subtext="Graduation Year Distribution"
                            />
                        </div>
                    </div>
                )}

                {/* User Feedback Section */}
                {stats?.feedback && stats.feedback.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-[#E6E9EB] mb-6 flex items-center gap-2">
                            <FaComment className="text-[#2EFF8A]" />
                            User Feedback
                            <span className="text-sm font-normal text-[#9AA3A8] ml-2">({stats.feedback.length} messages)</span>
                        </h2>
                        <div className="grid gap-4">
                            {stats.feedback.map((item) => (
                                <div key={item.id} className="bg-[#111316] border border-[#2a2d32] rounded-xl p-5 hover:border-[#2EFF8A]/30 transition-all group">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${item.type === 'bug' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                item.type === 'suggestion' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                    item.type === 'praise' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' :
                                                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                }`}>
                                                {item.type}
                                            </span>
                                            <span className="text-[#E6E9EB] font-medium">{item.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[#6b7280] text-xs">
                                                {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <button
                                                onClick={async () => {
                                                    if (confirm('Delete this feedback?')) {
                                                        const result = await deleteFeedback(item.id);
                                                        if (result.success) {
                                                            // Remove from local state
                                                            setStats(prev => ({
                                                                ...prev,
                                                                feedback: prev.feedback.filter(f => f.id !== item.id)
                                                            }));
                                                        }
                                                    }
                                                }}
                                                className="p-2 text-[#6b7280] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                title="Delete feedback"
                                            >
                                                <FaTrash className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-[#9AA3A8] text-sm leading-relaxed pl-1 border-l-2 border-[#2a2d32] ml-1">{item.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="text-center text-[#9AA3A8]/60 text-xs mt-20 mb-8 border-t border-[#2a2d32] pt-8">
                    <p>Work.CV Admin Console v2.1 • Secure Connection • Authorized Personnel Only</p>
                </div>
            </div>
        </div>
    );
}
