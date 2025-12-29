'use client';
import { useEffect, useState } from 'react';

/**
 * FallingAvatars - Fun animated avatars that fall like light rain
 */
export default function FallingAvatars() {
    const [avatars, setAvatars] = useState([]);

    useEffect(() => {
        // Generate 8 super large avatars
        const newAvatars = [
            { id: 1, left: 2, delay: 0, duration: 16, size: 100 },
            { id: 2, left: 18, delay: 5, duration: 18, size: 90 },
            { id: 3, left: 35, delay: 10, duration: 14, size: 120 },
            { id: 4, left: 50, delay: 3, duration: 17, size: 100 },
            { id: 5, left: 65, delay: 8, duration: 15, size: 110 },
            { id: 6, left: 78, delay: 12, duration: 19, size: 90 },
            { id: 7, left: 90, delay: 4, duration: 16, size: 100 },
        ];
        setAvatars(newAvatars);
    }, []);

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
