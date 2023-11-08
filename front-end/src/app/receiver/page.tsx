import ReceiverWindow from "@/components/receiver/ReceiverWindow";
import rootPath from "@/metadata/root-path";
import { Metadata } from "next";
import style from "./page.module.scss";
import GetArch from "./GetArch";
import MoreLinks from "@/components/common/MoreLinks";
import ReloadMetadata from "@/components/common/ReloadMetadata";

export const metadata: Metadata = {
    title: "ArchGemini from KPVERSE",
    icons: rootPath + "/favicon.ico",
};

export default function page() {
    return (
        <>
            <ReceiverWindow>
                <div className={style["explorer-frame"]}>
                    <GetArch />
                </div>
            </ReceiverWindow>
            <MoreLinks />
        </>
    );
}
