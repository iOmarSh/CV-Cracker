"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useAppContext from "@/hooks/useAppContext";
import BaseModal from "@/components/auth/base-modal";

/**
 * HomeHero - Hero section for landing page
 * Two-column layout: copy on left, ATS widget on right
 */
const HomeHero = () => {
    const { isAuthenticated } = useAppContext();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const router = useRouter();

    const handleCTAClick = () => {
        // Explicitly check for true - anything else (false, undefined, null) shows login
        if (isAuthenticated === true) {
            router.push('/dashboard');
        } else {
            setIsLoginOpen(true);
        }
    };

    return (
        <>
            <section className="min-h-[calc(100vh-56px)] flex items-center py-16 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Copy Block */}
                        <div className="space-y-6">
                            {/* Code Token Pre-title */}
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-shell-muted text-sm">// cv.crack</span>
                                <span className="px-2 py-0.5 bg-accent-dim text-accent text-xs font-mono rounded">v2.0</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shell-text leading-tight">
                                Build <span className="text-accent">ATS-ready</span> CVs
                                <br />
                                Fast and Accurate
                            </h1>

                            {/* Subtext */}
                            <p className="text-shell-muted text-lg max-w-xl leading-relaxed">
                                Create, edit, and download pixel-perfect CVs that pass ATS checks.
                                Choose templates, tune content, and export with confidence.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button
                                    onClick={handleCTAClick}
                                    className="btn btn-primary text-base py-3 px-6 shadow-glow"
                                >
                                    Create My CV — Free
                                </button>
                                <button
                                    onClick={handleCTAClick}
                                    className="btn btn-ghost text-base py-3 px-6 border border-shell-border"
                                >
                                    Try ATS Checker
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-8 pt-6">
                                <div>
                                    <div className="text-2xl font-bold text-accent">93%</div>
                                    <div className="text-shell-muted text-sm">Avg. ATS Score</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-shell-text">50k+</div>
                                    <div className="text-shell-muted text-sm">CVs Created</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-shell-text">99%</div>
                                    <div className="text-shell-muted text-sm">Export Fidelity</div>
                                </div>
                            </div>
                        </div>

                        {/* Right - ATS Widget */}
                        <div className="lg:pl-8">
                            <ATSSnapshotWidget />
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
};

/**
 * ATSSnapshotWidget - Demo ATS checker display
 */
const ATSSnapshotWidget = () => {
    const score = 93;

    return (
        <div className="bg-shell-panel border border-shell-border rounded-xl p-6 shadow-card">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                    <span className="font-semibold text-shell-text">ATS Checker</span>
                </div>
                <span className="text-xs text-shell-muted bg-shell-surface px-2 py-1 rounded">Demo</span>
            </div>

            {/* Score Display */}
            <div className="text-center py-8">
                <div className="relative w-32 h-32 mx-auto mb-4">
                    {/* Score Circle */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#2a2d32"
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
                        <span className="text-3xl font-bold text-accent">{score}%</span>
                    </div>
                </div>
                <p className="text-shell-text font-medium">ATS Score</p>
            </div>

            {/* Sample Info */}
            <div className="bg-shell-surface rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-10 bg-shell-border rounded flex items-center justify-center">
                        <svg className="w-4 h-4 text-shell-muted" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-shell-text">Template: Minimal Pro</p>
                        <p className="text-xs text-shell-muted">Resume structure + keywords</p>
                    </div>
                </div>
            </div>

            {/* Checks */}
            <div className="space-y-2 mb-4">
                <CheckItem label="Semantic headings" passed={true} />
                <CheckItem label="Single column layout" passed={true} />
                <CheckItem label="ATS-safe fonts" passed={true} />
                <CheckItem label="Keywords optimized" passed={true} />
            </div>

            {/* CTA */}
            <button className="w-full btn btn-secondary text-sm py-2">
                Run Full Check
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-shell-dim text-center mt-3">
                Sample ATS Accuracy — Demo only
            </p>
        </div>
    );
};

const CheckItem = ({ label, passed }) => (
    <div className="flex items-center gap-2 text-sm">
        <span className={passed ? "text-accent" : "text-red-400"}>
            {passed ? "✓" : "✗"}
        </span>
        <span className="text-shell-muted">{label}</span>
    </div>
);

export default HomeHero;
