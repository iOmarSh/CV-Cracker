import "../globals.css";
import { geistMono, geistSans } from "@/app/fonts";
import PremiumNavbar from "@/components/layout/premium-navbar";
import AppProvider from "@/context/app-provider";
import FeedbackButton from "@/components/feedback/feedback-button";

export const metadata = {
    title: "cv.crack — About",
    description: "Learn about cv.crack and how it helps you land interviews.",
};

export default function AboutLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f1113] relative flex min-h-screen w-full flex-col`}>
                    <AppProvider>
                        <PremiumNavbar />
                        {children}
                        <FeedbackButton />
                    </AppProvider>
                </div>
            </body>
        </html>
    );
}
