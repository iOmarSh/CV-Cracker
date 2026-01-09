'use client';
import { useEffect, useState } from 'react';

/**
 * FallingAvatars - Fun animated avatars that fall like light rain
 */
export default function FallingAvatars() {
    const [avatars, setAvatars] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // On mobile: fewer avatars, no delays, smaller sizes
        // On desktop: original behavior
        const mobileAvatars = [
            { id: 1, left: 5, delay: 0, duration: 12, size: 50 },
            { id: 2, left: 30, delay: 0, duration: 14, size: 45 },
            { id: 3, left: 55, delay: 0, duration: 13, size: 50 },
            { id: 4, left: 80, delay: 0, duration: 15, size: 45 },
        ];

        const desktopAvatars = [
            { id: 1, left: 2, delay: 0, duration: 16, size: 100 },
            { id: 2, left: 18, delay: 5, duration: 18, size: 90 },
            { id: 3, left: 35, delay: 10, duration: 14, size: 120 },
            { id: 4, left: 50, delay: 3, duration: 17, size: 100 },
            { id: 5, left: 65, delay: 8, duration: 15, size: 110 },
            { id: 6, left: 78, delay: 12, duration: 19, size: 90 },
            { id: 7, left: 90, delay: 4, duration: 16, size: 100 },
        ];

        setAvatars(isMobile ? mobileAvatars : desktopAvatars);
    }, [isMobile]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
            {avatars.map((avatar) => (
                <div
                    key={avatar.id}
                    className="absolute animate-fall"
                    style={{
                        left: `${avatar.left}%`,
                        animationDelay: `${avatar.delay}s`,
                        animationDuration: `${avatar.duration}s`,
                    }}
                >
                    <img
                        src="/me-m2.png"
                        alt=""
                        className="rounded-full border-4 border-[#2EFF8A]/60 opacity-75 shadow-xl"
                        style={{
                            width: `${avatar.size}px`,
                            height: `${avatar.size}px`,
                        }}
                    />
                </div>
            ))}

            <style jsx>{`
                @keyframes fall {
                    0% {
                        transform: translateY(-200px) rotate(0deg);
                        opacity: 0;
                    }
                    5% {
                        opacity: 0.75;
                    }
                    95% {
                        opacity: 0.75;
                    }
                    100% {
                        transform: translateY(105vh) rotate(180deg);
                        opacity: 0;
                    }
                }
                .animate-fall {
                    animation: fall linear infinite;
                }
            `}</style>
        </div>
    );
}
