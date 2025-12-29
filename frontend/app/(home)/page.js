import HomeHero from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import Footer from "@/components/layout/footer";
import FallingAvatars from "@/components/home/falling-avatars";

export default function HomePage() {
    return (
        <main>
            <FallingAvatars />
            <HomeHero />
            <FeaturesSection />
            <Footer />
        </main>
    );
}
