import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import rootPath from "@/metadata/root-path";
import style from "./layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ArchGemini from KPVERSE",
    icons: rootPath + "/favicon.ico",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={[inter.className, style.layout].join(" ")}>
                {children}
            </body>
        </html>
    );
}
