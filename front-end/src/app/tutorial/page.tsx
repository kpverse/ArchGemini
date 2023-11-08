import { Metadata } from "next";
import style from "./page.module.scss";
import CommonHeader from "@/components/common/CommonHeader";
import rootPath from "@/metadata/root-path";

export const metadata: Metadata = {
    title: "ArchGemini Tutorial",
    icons: rootPath + "/favicon.ico",
};

export default function page() {
    return (
        <div className={style["tutorial"]}>
            <CommonHeader title="ArchGemini Tutorial" />
            <iframe
                className={style["tut-video"]}
                src="https://www.youtube.com/embed/_PQtajOaq_Y?si=LT-yZzSEuO27LMpr"
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
}
