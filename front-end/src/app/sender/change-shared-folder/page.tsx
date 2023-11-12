import SenderWindow from "@/components/sender/SenderWindow";
import { Metadata } from "next";
import ChangeSharedFolder from "./ChangeSharedFolder";
import rootPath from "@/metadata/root-path";
import MoreLinks from "@/components/common/MoreLinks";
import ReloadMetadata from "@/components/common/ReloadMetadata";

export const metadata: Metadata = {
    title: "Change Shared Folder - ArchGemini",
    icons: rootPath + "/favicon.ico",
};
export default function page() {
    return (
        <>
            <ReloadMetadata title={metadata.title as string} />
            <SenderWindow>
                <ChangeSharedFolder />
            </SenderWindow>
            <MoreLinks />
        </>
    );
}
