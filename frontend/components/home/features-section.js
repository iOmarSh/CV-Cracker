'use client';
import Link from "next/link";

/**
 * FeaturesSection - Highlights key features of work.cv
 */
export default function FeaturesSection() {
    const features = [
        {
            icon: "📄",
            title: "JSON-Based CVs",
            description: "Your CV is stored as a JSON object. Import, export, and manipulate your data with ease."
        },
        {
            icon: "🎯",
            title: "96%+ ATS Score",
            description: "Templates designed to pass Applicant Tracking Systems with consistently high scores."
        },
        {
            icon: "⚡",
            title: "Real-time Preview",
            description: "See your changes instantly as you edit. What you see is exactly what you get."
        },
        {
            icon: "📥",
            title: "Export Anywhere",
            description: "Download as PDF or JSON. Perfect for job applications or backup."
        },
        {
            icon: "🔄",
            title: "Instant Sync",
            description: "Your CVs sync automatically. Access them from any device."
        },
        {
            icon: "✨",
            title: "Easy Customization",
            description: "Drag and drop sections, edit inline, and personalize your layout."
        }
    ];

    return (
        <section className="py-20 px-6 lg:px-12 bg-[#0a0b0d]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="font-mono text-[#2EFF8A] text-sm mb-4 block">// features</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#E6E9EB] mb-4">
                        Everything you need to land interviews
                    </h2>
                    <p className="text-[#9AA3A8] text-lg max-w-2xl mx-auto">
                        Built by developers who understand what ATS systems look for.
                        Create CVs that get past the bots and into human hands.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#111316] border border-[#2a2d32] rounded-xl p-6 hover:border-[#2EFF8A]/30 transition-colors"
                        >
                            <div className="text-3xl mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-[#E6E9EB] mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-[#9AA3A8] text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <Link
                        href="/dashboard"
                        className="inline-flex px-8 py-4 text-lg font-semibold bg-[#2EFF8A] text-[#0f1113] rounded-lg hover:bg-[#26d975] transition-colors shadow-[0_0_30px_rgba(46,255,138,0.2)]"
                    >
                        Start Building Your CV
                    </Link>
                </div>
            </div>
        </section>
    );
}
