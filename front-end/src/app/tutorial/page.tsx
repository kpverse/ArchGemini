import { Metadata } from "next";
import style from "./page.module.scss";
import CommonHeader from "@/components/common/CommonHeader";
import rootPath from "@/metadata/root-path";
import ReloadMetadata from "@/components/common/ReloadMetadata";

export const metadata: Metadata = {
    title: "ArchGemini Tutorial",
    icons: rootPath + "/favicon.ico",
};

export default function page() {
    return (
        <>
            <ReloadMetadata title={metadata.title as string} />
            <div className={style["tutorial"]}>
                <CommonHeader title="ArchGemini Tutorial" />
                <iframe
                    className={style["tut-video"]}
                    src="https://www.youtube.com/embed/tZGtXsMRpLU"
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </>
    );
}
