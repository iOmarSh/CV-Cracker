"use client";
import React from "react";
import Link from "next/link";
import useAppContext from "@/hooks/useAppContext";

/**
 * AppHeader - Main navigation header for the app shell
 * Dark theme, 56px height, brand left, nav center, user avatar right
 */
const AppHeader = ({ showNav = true }) => {
    const { user, isAuthenticated } = useAppContext();

    return (
        <header className="app-header sticky top-0 z-50 flex items-center justify-between px-6 bg-shell-panel border-b border-shell-border h-14">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2 text-shell-text hover:text-accent transition-colors">
                <span className="text-accent font-mono text-sm">{'<'}</span>
                <span className="font-semibold text-lg tracking-tight">CVCraft</span>
                <span className="text-accent font-mono text-sm">{'/>'}</span>
            </Link>

            {/* Center Nav */}
            {showNav && (
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-shell-muted hover:text-shell-text transition-colors text-sm"
                    >
                        Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-shell-muted hover:text-shell-text transition-colors text-sm"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="#features"
                        className="text-shell-muted hover:text-shell-text transition-colors text-sm"
                    >
                        Features
                    </Link>
                </nav>
            )}

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <>
                        <Link
                            href="/dashboard"
                            className="btn btn-primary text-sm py-2 px-4"
                        >
                            My CVs
                        </Link>
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-black font-semibold text-sm">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                    </>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-shell-muted hover:text-shell-text transition-colors text-sm hidden sm:block"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/dashboard"
                            className="btn btn-primary text-sm py-2 px-4"
                        >
                            Create CV — Free
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default AppHeader;
