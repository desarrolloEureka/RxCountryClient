import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardFooter from "./component/DashboardFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "RxCountry",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                {children}
                <DashboardFooter />
            </body>
        </html>
    );
}
