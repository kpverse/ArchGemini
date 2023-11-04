import ReceiverWindow from "@/components/receiver/ReceiverWindow";
import rootPath from "@/metadata/root-path";
import { Metadata } from "next";
import style from "./page.module.scss";
import GetArch from "./GetArch";

export const metadata: Metadata = {
    title: "ArchGemini from KPVERSE",
    icons: rootPath + "/favicon.ico",
};

export default function page() {
    return (
        <ReceiverWindow>
            <div className={style["explorer-frame"]}>
                <GetArch />
            </div>
        </ReceiverWindow>
    );
}
