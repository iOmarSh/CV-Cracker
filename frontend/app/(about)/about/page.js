import ImageViewer from "@/components/about/image-viewer";
import Footer from "@/components/layout/footer";


function Profile() {
    return (
        <div className="sticky top-24 w-full md:w-1/3 mb-8 text-center md:text-left">
            {/* Profile Image and Name */}
            <div className="mb-8 text-center">
                <img
                    src="/me-m.png"
                    alt="Omar Shawky"
                    className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-[#2a2d32]"
                />
                <h2 className="text-3xl font-semibold mt-4 text-[#E6E9EB]">
                    Omar Shawky <span className="text-sm text-[#9AA3A8]">(WOW)</span>
                </h2>
                <p className="text-xl text-[#9AA3A8]">AI Engineer</p>

                <div className="flex justify-center space-x-8 mt-4">
                    <a
                        href="https://www.linkedin.com/in/omarshawkys/"
                        className="text-[#2EFF8A] hover:text-[#26d975] text-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/iOmarSh"
                        className="text-[#2EFF8A] hover:text-[#26d975] text-lg"
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
            <div className="text-white min-h-screen px-8 py-12">
                <h1 className="text-4xl font-bold mb-8 text-center text-[#E6E9EB]">
                    cv<span className="text-[#2EFF8A]">.</span>craft — Bypass ATS with 96-100% Score
                </h1>

                <section className="py-12">
                    <div className="container flex flex-col md:flex-row gap-8">
                        {/* Profile Section */}
                        <Profile />

                        {/* Content Section */}
                        <div className="w-full md:w-2/3">
                            <section className="mb-8">
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="overflow-hidden rounded-xl border border-[#2a2d32]">
                                        <img
                                            src="/ats2.png"
                                            alt="ATS Score Result"
                                            className="w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="overflow-hidden rounded-xl border border-[#2a2d32]">
                                        <img
                                            src="/ats1.png"
                                            alt="ATS Score Result"
                                            className="w-full object-cover object-center"
                                        />
                                    </div>
                                </div>
                            </section>

                            <p className="text-2xl font-bold mb-2 text-center text-[#E6E9EB]">
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

                            <p className="text-xl mb-8 text-center text-[#9AA3A8]">
                                Your CV Now Is JSON Object <span className="text-sm">[GPT Is Looking For You] 👀</span>
                            </p>

                            <div className="text-xl font-semibold mb-12">
                                <h3 className="text-2xl font-extrabold mb-6 text-[#2EFF8A] text-center">Features</h3>
                                <div className="bg-[#111316] border border-[#2a2d32] rounded-2xl p-6">
                                    <ul className="list-none space-y-4">
                                        <li className="text-lg text-[#9AA3A8]">
                                            <span className="font-bold text-[#2EFF8A]">1.</span> Convert your CV to JSON object
                                        </li>
                                        <li className="text-lg text-[#9AA3A8]">
                                            <span className="font-bold text-[#2EFF8A]">2.</span> Convert your JSON object to CV
                                        </li>
                                        <li className="text-lg text-[#9AA3A8]">
                                            <span className="font-bold text-[#2EFF8A]">3.</span> Save your CV as PDF
                                        </li>
                                        <li className="text-lg text-[#9AA3A8]">
                                            <span className="font-bold text-[#2EFF8A]">4.</span> Download your CV as JSON object
                                        </li>
                                        <li className="text-lg text-[#9AA3A8]">
                                            <span className="font-bold text-[#2EFF8A]">5.</span> Download your CV as PDF
                                        </li>
                                        <li className="text-lg text-[#9AA3A8]">
                                            <span className="font-bold text-[#2EFF8A]">6.</span> Duplicate your CV via paste JSON object
                                        </li>
                                    </ul>
                                </div>
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