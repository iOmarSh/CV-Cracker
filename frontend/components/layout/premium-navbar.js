'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import useAppContext from "@/hooks/useAppContext";
import UserProfileButton from "@/components/profile/user-profile";
import BaseModal from "@/components/auth/base-modal";
import { FaTimes, FaBars } from "react-icons/fa";

export default function PremiumNavbar() {
    const pathname = usePathname();
    const { isAuthenticated, user } = useAppContext();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleLogoClick = (e) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        ...(isAuthenticated ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
        ...(isAuthenticated && user?.isAdmin ? [{ href: '/admin', label: 'Admin' }] : [])
    ];

    return (
        <>
            <header
                className={`
                    fixed top-0 left-0 right-0 z-50
                    h-16 md:h-18
                    flex items-center justify-between
                    px-4 sm:px-6 md:px-8 lg:px-12
                    transition-all duration-500
                    ${isScrolled
                        ? 'bg-[#0a0b0d]/90 backdrop-blur-xl border-b border-[#2EFF8A]/10 shadow-[0_4px_30px_rgba(46,255,138,0.05)]'
                        : 'bg-transparent border-b border-transparent'
                    }
                `}
            >
                {/* Left - Brand with glow effect */}
                <Link
                    href="/"
                    onClick={handleLogoClick}
                    className="group flex items-center gap-1 transition-all hover:scale-105"
                >
                    <div className="relative">
                        <span className="font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                            work
                        </span>
                        <span className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-[#2EFF8A] animate-pulse">
                            .
                        </span>
                        <span className="font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                            cv
                        </span>
                        {/* Glow effect on hover */}
                        <div className="absolute -inset-2 bg-[#2EFF8A]/0 group-hover:bg-[#2EFF8A]/5 rounded-lg transition-all duration-300 -z-10"></div>
                    </div>
                </Link>

                {/* Center - Nav Links (Desktop only) */}
                <nav className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`
                                    relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                                    ${isActive
                                        ? 'text-[#0f1113] bg-[#2EFF8A] shadow-[0_0_20px_rgba(46,255,138,0.3)]'
                                        : 'text-[#9AA3A8] hover:text-[#E6E9EB] hover:bg-white/5'
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right - CTA & Mobile Menu Button */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <UserProfileButton username={user?.username} />
                    ) : (
                        <>
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="hidden sm:block text-sm font-medium text-[#9AA3A8] hover:text-[#2EFF8A] transition-colors px-3 py-2"
                            >
                                Sign in
                            </button>
                            <Link
                                href="/dashboard"
                                className="
                                    hidden sm:flex
                                    relative px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-bold
                                    text-[#2EFF8A]
                                    border border-[#2EFF8A]
                                    rounded-full
                                    hover:bg-[#2EFF8A] hover:text-[#0f1113]
                                    hover:shadow-[0_0_20px_rgba(46,255,138,0.4)]
                                    transition-all duration-300
                                    hover:scale-105
                                    overflow-hidden
                                    group
                                "
                            >
                                <span className="relative z-10">Get Started</span>
                                <div className="absolute inset-0 bg-[#2EFF8A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-0"></div>
                            </Link>
                        </>
                    )}

                    {/* Mobile Menu Button - Only visible on mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden flex items-center justify-center w-10 h-10 text-[#2EFF8A] hover:bg-white/5 rounded-lg transition-colors"
                        aria-label="Open menu"
                    >
                        <FaBars className="text-xl" />
                    </button>
                </div>
            </header>

            {/* Spacer to prevent content from hiding under fixed navbar */}
            <div className="h-16 md:h-18" />

            {/* Mobile Menu Overlay - Only on mobile */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-[100]">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className="absolute right-0 top-0 h-full w-72 bg-[#0a0b0d] border-l border-[#2a2d32] shadow-2xl">
                        {/* Close Button */}
                        <div className="flex items-center justify-between p-4 border-b border-[#2a2d32]">
                            <span className="font-mono text-lg font-bold text-white">
                                work<span className="text-[#2EFF8A]">.</span>cv
                            </span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-10 h-10 flex items-center justify-center text-[#9AA3A8] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                aria-label="Close menu"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <nav className="p-4 space-y-2">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`
                                            block w-full px-4 py-3 text-base font-medium rounded-xl transition-all
                                            ${isActive
                                                ? 'text-[#0f1113] bg-[#2EFF8A]'
                                                : 'text-[#E6E9EB] hover:bg-white/5'
                                            }
                                        `}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Auth Actions */}
                        {!isAuthenticated && (
                            <div className="p-4 border-t border-[#2a2d32] space-y-3">
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsLoginOpen(true);
                                    }}
                                    className="w-full py-3 text-base font-medium text-[#E6E9EB] hover:text-[#2EFF8A] transition-colors"
                                >
                                    Sign in
                                </button>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full py-3 text-center text-base font-bold text-[#0f1113] bg-[#2EFF8A] rounded-xl hover:bg-[#26d975] transition-colors"
                                >
                                    Get Started — Free
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}

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
