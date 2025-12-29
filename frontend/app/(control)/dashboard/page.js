'use client'
import { ResumeList } from "@/components/dashboard/resume-list";
import MatrixBackground from "@/components/effects/matrix-background";

export default function DashBoardPage() {
    return (
        <div className="relative min-h-screen">
            {/* Matrix Background Effect */}
            <MatrixBackground />

            {/* Content Layer */}
            <div className="relative z-10 mx-auto w-full max-w-[1280px] pb-40">
                {/* Heading with glassmorphism */}
                <div className="dbpx pt-4 md:pt-6">
                    <div className="flex w-full flex-col items-center">
                        {/* Floating badge */}
                        <div className="mb-4 px-4 py-1.5 rounded-full bg-[#2EFF8A]/10 border border-[#2EFF8A]/30 backdrop-blur-sm">
                            <span className="text-[#2EFF8A] text-sm font-medium">✨ Welcome to your Resume Builder</span>
                        </div>

                        {/* Main heading with gradient */}
                        <h2 className="mt-2 max-w-[20ch] text-center text-4xl font-extrabold sm:mt-[10px] sm:text-5xl md:mt-3 lg:mt-[18px] lg:text-6xl bg-gradient-to-r from-[#E6E9EB] via-[#2EFF8A] to-[#E6E9EB] bg-clip-text text-transparent animate-pulse">
                            What do you want to create?
                        </h2>

                        {/* Subtitle */}
                        <p className="mt-3 text-[#6b7280] text-center max-w-md">
                            Build stunning ATS-friendly resumes in minutes
                        </p>
                    </div>
                </div>

                {/* Containers */}
                <div className="pt-12 md:pt-16 lg:pt-20" id="myResumes">
                    {/* My Resumes Headers with glow effect */}
                    <div className="dbpx">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-8 bg-[#2EFF8A] rounded-full shadow-[0_0_10px_#2EFF8A]"></div>
                            <h2 className="text-[#E6E9EB] text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                                My resumes
                            </h2>
                        </div>
                        <p className="mt-2 text-sm text-[#6b7280] md:mt-3 md:text-base ml-4">
                            Your resume – 100% free, forever, all features, unlimited downloads.
                        </p>
                    </div>

                    {/* My Resumes List */}
                    <ResumeList className="mt-4 w-full lg:mt-6" />
                </div>
            </div>
        </div>
    );
}
