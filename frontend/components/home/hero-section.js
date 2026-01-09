'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAppContext from "@/hooks/useAppContext";
import BaseModal from "@/components/auth/base-modal";

/**
 * HomeHero - Premium hero section with code-style branding
 * and ATS score demo widget
 */
export default function HomeHero() {
    const { isAuthenticated } = useAppContext();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const router = useRouter();

    const handleCTAClick = () => {
        if (isAuthenticated === true) {
            router.push('/dashboard');
        } else {
            setIsLoginOpen(true);
        }
    };

    return (
        <>
            <section className="min-h-[calc(100vh-64px)] flex items-center py-16 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Copy Block */}
                        <div className="space-y-6">
                            {/* Code Token Pre-title */}
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-[#9AA3A8] text-sm">// cv.craft</span>
                                <span className="px-2 py-0.5 bg-[#2EFF8A]/10 text-[#2EFF8A] text-xs font-mono rounded">v2.0</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E6E9EB] leading-tight">
                                Build <span className="text-[#2EFF8A]">ATS-ready</span> CVs
                                <br />
                                Fast and Accurate
                            </h1>

                            {/* Subtext */}
                            <p className="text-[#9AA3A8] text-lg max-w-xl leading-relaxed">
                                Create, edit, and download pixel-perfect CVs that pass ATS checks.
                                Choose templates, tune content, and export with confidence.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button
                                    onClick={handleCTAClick}
                                    className="px-6 py-3 text-base font-semibold bg-[#2EFF8A] text-[#0f1113] rounded-lg hover:bg-[#26d975] transition-colors shadow-[0_0_25px_rgba(46,255,138,0.2)]"
                                >
                                    Create My CV — Free
                                </button>
                                <button
                                    onClick={handleCTAClick}
                                    className="px-6 py-3 text-base font-semibold text-[#E6E9EB] rounded-lg border border-[#2a2d32] hover:bg-[#111316] transition-colors"
                                >
                                    Start Building Your CV
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-8 pt-6">
                                <div>
                                    <div className="text-2xl font-bold text-[#2EFF8A]">96%+</div>
                                    <div className="text-[#9AA3A8] text-sm">ATS Score</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#E6E9EB]">50k+</div>
                                    <div className="text-[#9AA3A8] text-sm">CVs Created</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#E6E9EB]">JSON</div>
                                    <div className="text-[#9AA3A8] text-sm">Based</div>
                                </div>
                            </div>
                        </div>

                        {/* Right - ATS Widget */}
                        <div className="lg:pl-8">
                            <ATSSnapshotWidget onCTAClick={handleCTAClick} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Auth Modal */}
            <BaseModal
                isOpen={isLoginOpen}
                isLogin={true}
                handleAuthAction={() => { }}
                closeModal={() => setIsLoginOpen(false)}
            />
        </>
    );
}

/**
 * ATSSnapshotWidget - Demo ATS checker display
 */
function ATSSnapshotWidget({ onCTAClick }) {
    const score = 96;

    return (
        <div className="bg-[#111316] border border-[#2a2d32] rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2EFF8A] animate-pulse" />
                    <span className="font-semibold text-[#E6E9EB]">ATS Checker</span>
                </div>
                <span className="text-xs text-[#6b7280] bg-[#1a1d21] px-2 py-1 rounded">Demo</span>
            </div>

            {/* Score Display */}
            <div className="text-center py-8">
                <div className="relative w-36 h-36 mx-auto mb-4">
                    {/* Score Circle */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#1a1d21"
                            strokeWidth="8"
                        />
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#2EFF8A"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${score * 3.39} 339`}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-[#2EFF8A]">{score}%</span>
                    </div>
                </div>
                <p className="text-[#E6E9EB] font-medium text-lg">ATS Score</p>
            </div>

            {/* Checks */}
            <div className="space-y-3 mb-6 bg-[#1a1d21] rounded-lg p-4">
                <CheckItem label="Semantic HTML headings" passed={true} />
                <CheckItem label="Single column layout" passed={true} />
                <CheckItem label="ATS-safe fonts embedded" passed={true} />
                <CheckItem label="Keywords optimized" passed={true} />
                <CheckItem label="Contact info parseable" passed={true} />
            </div>

            {/* CTA */}
            <button
                onClick={onCTAClick}
                className="w-full block text-center py-3 bg-[#1a1d21] border border-[#2a2d32] rounded-lg text-[#E6E9EB] font-medium hover:bg-[#2a2d32] transition-colors"
            >
                Try It Free →
            </button>
        </div>
    );
}

function CheckItem({ label, passed }) {
    return (
        <div className="flex items-center gap-3 text-sm">
            <span className={`text-lg ${passed ? "text-[#2EFF8A]" : "text-red-400"}`}>
                {passed ? "✓" : "✗"}
            </span>
            <span className="text-[#9AA3A8]">{label}</span>
        </div>
    );
}
