'use client';
import { AiFillHome } from "react-icons/ai";
import { FaInfoCircle, FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";


const IconMap = {
    AiFillHome,
    FaInfoCircle,
    FaUser
};




export default function NavItem({ href, icon, children }) {
    const currentPath = usePathname();
    const isActive = currentPath === href;
    const Icon = IconMap[icon];
    return (
        <Link
            href={href}
            className={`flex items-center gap-2 ${isActive ? "text-[#E6E9EB]" : "text-[#9AA3A8]"
                } hover:text-[#2EFF8A]`}
        >
            <Icon className={`text-lg ${isActive ? "text-[#2EFF8A]" : "text-[#9AA3A8]"}`} />
            {children}
        </Link>
    );
}
