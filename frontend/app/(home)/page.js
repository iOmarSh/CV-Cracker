import HomeHero from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import Footer from "@/components/layout/footer";
import FallingAvatars from "@/components/home/falling-avatars";
import FloatingCode from "@/components/effects/floating-code";

export default function HomePage() {
    return (
        <main>
            {/* Background Effects */}
            <FallingAvatars />
            <FloatingCode />

            {/* Main Content */}
            <HomeHero />
            <FeaturesSection />
            <Footer />
        </main>
    );
}
