import ImageViewer from "@/components/about/image-viewer";
import Footer from "@/components/layout/footer";
import FloatingCode from "@/components/effects/floating-code";


function Profile() {
    return (
        <div className="sticky top-24 w-full md:w-1/3 mb-8 text-center md:text-left">
            {/* Profile Image and Name */}
            <div className="mb-8 text-center">
                <div className="relative inline-block">
                    <img
                        src="/me-m.png"
                        alt="Omar Shawky"
                        className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-[#2EFF8A]/50 hover:border-[#2EFF8A] transition-all"
                    />
                    {/* Glowing ring effect */}
                    <div className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ boxShadow: '0 0 30px rgba(46, 255, 138, 0.3)' }} />
                </div>
                <h2 className="text-3xl font-semibold mt-4 text-[#E6E9EB]">
                    Omar Shawky <span className="text-sm text-[#9AA3A8]">(WOW)</span>
                </h2>
                <p className="text-xl text-[#9AA3A8]">AI Engineer</p>
                <p className="text-sm text-[#2EFF8A] mt-2 italic">"Making ATS go brrrr..."</p>

                <div className="flex justify-center space-x-8 mt-4">
                    <a
                        href="https://www.linkedin.com/in/omarshawkys/"
                        className="text-[#2EFF8A] hover:text-[#26d975] text-lg hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/iOmarSh"
                        className="text-[#2EFF8A] hover:text-[#26d975] text-lg hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}

export default async function AboutPage() {
    return (
        <>
            {/* Floating code background */}
            <FloatingCode />

            <div className="relative text-white min-h-screen px-4 sm:px-8 py-12 z-10">
                {/* Subtle gradient overlay */}
                <div className="fixed inset-0 pointer-events-none z-0"
                    style={{
                        background: 'radial-gradient(ellipse at 30% 20%, rgba(46, 255, 138, 0.05) 0%, transparent 50%)',
                    }} />

                <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#E6E9EB] relative z-10">
                    cv<span className="text-[#2EFF8A]">.</span>craft — Bypass ATS with 96-100% Score
                </h1>

                <section className="py-8 sm:py-12 relative z-10">
                    <div className="container flex flex-col md:flex-row gap-8">
                        {/* Profile Section */}
                        <Profile />

                        {/* Content Section */}
                        <div className="w-full md:w-2/3">
                            <section className="mb-8">
                                <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                                    <div className="overflow-hidden rounded-xl border-2 border-[#2EFF8A]/30 hover:border-[#2EFF8A] transition-colors">
                                        <img
                                            src="/ats2.png"
                                            alt="ATS Score Result"
                                            className="w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="overflow-hidden rounded-xl border-2 border-[#2EFF8A]/30 hover:border-[#2EFF8A] transition-colors">
                                        <img
                                            src="/ats1.png"
                                            alt="ATS Score Result"
                                            className="w-full object-cover object-center"
                                        />
                                    </div>
                                </div>
                            </section>

                            <p className="text-xl sm:text-2xl font-bold mb-2 text-center text-[#E6E9EB]">
                                Results From{" "}
                                <a
                                    href="https://www.jobscan.co/"
                                    className="text-[#2EFF8A] hover:text-[#26d975] underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    JobScan
                                </a>
                                {" "}and{" "}
                                <a
                                    href="https://www.resumego.net/"
                                    className="text-[#2EFF8A] hover:text-[#26d975] underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ResumeGo
                                </a>
                            </p>

                            <p className="text-lg sm:text-xl mb-8 text-center text-[#9AA3A8]">
                                Your CV Now Is JSON Object <span className="text-sm">[GPT Is Looking For You] 👀</span>
                            </p>

                            <div className="text-xl font-semibold mb-12">
                                <h3 className="text-2xl font-extrabold mb-6 text-[#2EFF8A] text-center">Features</h3>
                                <div className="bg-[#111316]/80 backdrop-blur-sm border-2 border-[#2EFF8A]/30 rounded-2xl p-6">
                                    <ul className="list-none space-y-4">
                                        <li className="text-base sm:text-lg text-[#9AA3A8] flex items-start gap-3">
                                            <span className="font-bold text-[#2EFF8A] text-xl">🔄</span> Convert your CV to JSON object
                                        </li>
                                        <li className="text-base sm:text-lg text-[#9AA3A8] flex items-start gap-3">
                                            <span className="font-bold text-[#2EFF8A] text-xl">📄</span> Convert your JSON object to CV
                                        </li>
                                        <li className="text-base sm:text-lg text-[#9AA3A8] flex items-start gap-3">
                                            <span className="font-bold text-[#2EFF8A] text-xl">💾</span> Save your CV as PDF
                                        </li>
                                        <li className="text-base sm:text-lg text-[#9AA3A8] flex items-start gap-3">
                                            <span className="font-bold text-[#2EFF8A] text-xl">📥</span> Download your CV as JSON object
                                        </li>
                                        <li className="text-base sm:text-lg text-[#9AA3A8] flex items-start gap-3">
                                            <span className="font-bold text-[#2EFF8A] text-xl">🎯</span> 96-100% ATS Score Guaranteed
                                        </li>
                                        <li className="text-base sm:text-lg text-[#9AA3A8] flex items-start gap-3">
                                            <span className="font-bold text-[#2EFF8A] text-xl">♾️</span> 100% Free Forever
                                        </li>
                                    </ul>
                                </div>

                                {/* Fun easter egg */}
                                <p className="text-center text-[#2EFF8A]/30 text-xs mt-4 italic">
                                    * No robots were harmed in the making of this ATS cracker
                                </p>
                            </div>

                            <section className="mb-8">
                                <ImageViewer />
                            </section>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}