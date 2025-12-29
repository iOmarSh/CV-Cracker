'use client';

import { Menu } from '@headlessui/react';
import * as Actions from "@/actions/login";
import { useRouter } from "next/navigation";
import useAppContext from "@/hooks/useAppContext";
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const UserProfileButton = ({ username }) => {
    const router = useRouter();
    const { logout } = useAppContext();

    const handleLogout = async () => {
        const result = await Actions.logout();
        logout();
        if (result.success) {
            router.push("/");
        }
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="
                flex items-center gap-2 px-4 py-2
                rounded-full
                border border-[#2EFF8A]/50
                bg-[#111316]
                text-[#E6E9EB] text-sm font-medium
                hover:border-[#2EFF8A] hover:bg-[#1a1d21]
                transition-all duration-300
            ">
                <FaUser className="text-[#2EFF8A] text-sm" />
                <span className="hidden sm:inline">{username}</span>
            </Menu.Button>
            <Menu.Items className="
                absolute right-0 mt-2 w-48
                bg-[#111316] border border-[#2a2d32]
                text-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]
                overflow-hidden
            ">
                <Menu.Item>
                    {({ active }) => (
                        <button
                            onClick={handleLogout}
                            className={`
                                w-full px-4 py-3 text-left text-sm
                                flex items-center gap-3
                                ${active ? 'bg-[#1a1d21] text-[#2EFF8A]' : 'text-[#9AA3A8]'}
                                transition-colors
                            `}>
                            <FaSignOutAlt />
                            Logout
                        </button>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};

export default UserProfileButton;

