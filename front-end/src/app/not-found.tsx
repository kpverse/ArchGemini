import { Metadata } from "next";
import HomePage from "./page";
import rootPath from "@/metadata/root-path";

export const metadata: Metadata = {
    title: "404 - Page Not Found! - ArchGemini",
    icons: rootPath + "/favicon.ico",
};

export default function page() {
    return (
        <HomePage>
            <h1>404 - Page Not Found</h1>
        </HomePage>
    );
}
