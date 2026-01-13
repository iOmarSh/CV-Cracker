import localFont from "next/font/local";
import "../globals.css";
import "./dashboard.css";
import AppProvider from "@/context/app-provider";
import PremiumNavbar from "@/components/layout/premium-navbar";
import { geistMono, geistSans } from "@/app/fonts";
import FeedbackButton from "@/components/feedback/feedback-button";

export const metadata = {
    title: "cv.crack — Dashboard",
    description: "Build ATS-Ready CVs",
    icons: {
        icon: "/favicon.png",
    },
};



export default function RootLayout({ children }) {
    return (

        <html>
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
