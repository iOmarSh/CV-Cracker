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
                        <img
                            src="/me-m.png"
                            alt="Omar Shawky"
                            className="w-16 h-16 rounded-full object-cover border-2 border-[#2a2d32]"
                        />
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
                                className="text-[#9AA3A8] hover:text-[#0077b5] transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="text-2xl" />
                            </a>
                            <a
                                href="https://github.com/iOmarSh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#9AA3A8] hover:text-[#E6E9EB] transition-colors"
                                aria-label="GitHub"
                            >
                                <FaGithub className="text-2xl" />
                            </a>
                        </div>
                    </div>

                    {/* Brand & Copyright */}
                    <div className="text-center md:text-right">
                        <Link href="/" className="font-mono text-[#9AA3A8] hover:text-[#E6E9EB] transition-colors">
                            cv<span className="text-[#2EFF8A]">.</span>craft
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
