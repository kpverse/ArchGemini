import ReceiverWindow from "@/components/receiver/ReceiverWindow";
import rootPath from "@/metadata/root-path";
import { Metadata } from "next";
import MoreLinks from "@/components/common/MoreLinks";
import ExplorerFrame from "./ExplorerFrame";
import ReloadMetadata from "@/components/common/ReloadMetadata";

export const metadata: Metadata = {
    title: "ArchGemini from KPVERSE",
    icons: rootPath + "/favicon.ico",
};

export default function page() {
    return (
        <>
            <ReloadMetadata title={metadata.title as string} />
            <ReceiverWindow>
                <ExplorerFrame />
            </ReceiverWindow>
            <MoreLinks />
        </>
    );
}
