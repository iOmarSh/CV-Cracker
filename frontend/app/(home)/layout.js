import "../globals.css";
import { geistMono, geistSans } from "@/app/fonts";
import PremiumNavbar from "@/components/layout/premium-navbar";
import AppProvider from "@/context/app-provider";

export const metadata = {
    title: "cv.craft — Build ATS-Ready CVs",
    description: "Create, edit, and download pixel-perfect CVs that pass ATS checks.",
    icons: {
        icon: "/favicon.png",
    },
};

export default function HomeLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f1113] relative flex min-h-screen w-full flex-col`}>
                    <AppProvider>
                        <PremiumNavbar />
                        {children}
                    </AppProvider>
                </div>
            </body>
        </html>
    );
}
