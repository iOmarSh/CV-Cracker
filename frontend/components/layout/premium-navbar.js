'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import useAppContext from "@/hooks/useAppContext";
import UserProfileButton from "@/components/profile/user-profile";
import BaseModal from "@/components/auth/base-modal";

export default function PremiumNavbar() {
    const pathname = usePathname();
    const { isAuthenticated, user } = useAppContext();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogoClick = (e) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        ...(isAuthenticated ? [{ href: '/dashboard', label: 'Dashboard' }] : [])
    ];

    return (
        <>
            <header
                className={`
                    fixed top-0 left-0 right-0 z-50
                    h-16 md:h-18
                    flex items-center justify-between
                    px-6 md:px-8 lg:px-12
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
                        <span className="font-mono text-2xl md:text-3xl font-bold tracking-tight text-white">
                            cv
                        </span>
                        <span className="font-mono text-2xl md:text-3xl font-bold text-[#2EFF8A] animate-pulse">
                            .
                        </span>
                        <span className="font-mono text-2xl md:text-3xl font-bold tracking-tight text-white">
                            craft
                        </span>
                        {/* Glow effect on hover */}
                        <div className="absolute -inset-2 bg-[#2EFF8A]/0 group-hover:bg-[#2EFF8A]/5 rounded-lg transition-all duration-300 -z-10"></div>
                    </div>
                </Link>

                {/* Center - Nav Links with hover effects */}
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

                {/* Right - CTA with enhanced styling */}
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <UserProfileButton username={user?.username} />
                    ) : (
                        <>
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="hidden sm:block text-sm font-medium text-[#9AA3A8] hover:text-[#2EFF8A] transition-colors px-4 py-2"
                            >
                                Sign in
                            </button>
                            <Link
                                href="/dashboard"
                                className="
                                    relative px-6 py-2.5 text-sm font-bold
                                    bg-gradient-to-r from-[#2EFF8A] to-[#26d975]
                                    text-[#0f1113]
                                    rounded-full
                                    hover:shadow-[0_0_30px_rgba(46,255,138,0.4)]
                                    transition-all duration-300
                                    hover:scale-105
                                    overflow-hidden
                                    group
                                "
                            >
                                <span className="relative z-10">Get Started</span>
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </Link>
                        </>
                    )}

                    {/* Mobile Menu Button */}
                    <button className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <span className="w-5 h-0.5 bg-[#2EFF8A]" />
                        <span className="w-4 h-0.5 bg-[#2EFF8A]" />
                    </button>
                </div>
            </header>

            {/* Spacer to prevent content from hiding under fixed navbar */}
            <div className="h-16 md:h-18" />

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
