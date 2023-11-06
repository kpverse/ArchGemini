import { Metadata } from "next";
import HomePage from "./page";

export const metadata: Metadata = {
    title: "404 - Page Not Found! - ArchGemini",
};

export default function page() {
    return (
        <HomePage>
            <h1>404 - Page Not Found</h1>
        </HomePage>
    );
}
