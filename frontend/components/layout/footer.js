import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

/**
 * Footer with creator profile card
 */
export default function Footer() {
    return (
        <footer className="bg-[#0a0b0d] border-t border-[#1a1d21] py-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Creator Profile */}
                    <div className="flex items-center gap-5">
                        {/* Profile Image with Glow Effect */}
                        <div className="relative group">
                            <img
                                src="/me-m.png"
                                alt="Omar Shawky"
                                className="w-16 h-16 rounded-full object-cover border-2 border-[#2EFF8A]/30 group-hover:border-[#2EFF8A] transition-all duration-300 group-hover:scale-105"
                            />
                            {/* Glowing ring effect on hover */}
                            <div className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ boxShadow: '0 0 20px rgba(46, 255, 138, 0.4)' }} />
                        </div>
                        <div>
                            <p className="text-[#E6E9EB] font-semibold text-lg">
                                Omar Shawky
                                <span className="text-[#6b7280] text-sm ml-2">(WOW)</span>
                            </p>
                            <p className="text-[#9AA3A8] text-base">AI Engineer</p>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                            <a
                                href="https://www.linkedin.com/in/omarshawkys/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#9AA3A8] hover:text-[#0077b5] hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.6)] transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="text-2xl" />
                            </a>
                            <a
                                href="https://github.com/iOmarSh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#9AA3A8] hover:text-[#E6E9EB] hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(230,233,235,0.6)] transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <FaGithub className="text-2xl" />
                            </a>
                        </div>
                    </div>

                    {/* Brand & Copyright */}
                    <div className="text-center md:text-right">
                        <Link href="/" className="font-mono text-[#9AA3A8] hover:text-[#E6E9EB] transition-colors">
                            cv<span className="text-[#2EFF8A]">.</span>crack
                        </Link>
                        <p className="text-[#6b7280] text-xs mt-1">
                            © {new Date().getFullYear()} All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
