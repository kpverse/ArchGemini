import SenderWindow from "@/components/sender/SenderWindow";
import { Metadata } from "next";
import ChangeSharedFolder from "./ChangeSharedFolder";
import rootPath from "@/metadata/root-path";
import MoreLinks from "@/components/common/MoreLinks";

export const metadata: Metadata = {
    title: "Change Shared Folder - ArchGemini",
    icons: rootPath + "/favicon.ico",
};
export default function page() {
    return (
        <>
            <SenderWindow>
                <ChangeSharedFolder />
            </SenderWindow>
            <MoreLinks />
        </>
    );
}
