import { Metadata } from "next";
import style from "./page.module.scss";
import CommonHeader from "@/components/common/CommonHeader";
import rootPath from "@/metadata/root-path";

export const metadata: Metadata = {
    title: "ArchGemini Feedback",
    icons: rootPath + "/favicon.ico",
};

export default function page() {
    return (
        <div className={style["feedback"]}>
            <CommonHeader title="ArchGemini Feedback" />
            <iframe
                className={style["feedback-form"]}
                src="https://docs.google.com/forms/d/e/1FAIpQLSf5me4xZaBqc0HMl2Zg6pD9tAw8s0CK3_4z6EAAGDov-mvs4A/viewform?usp=sf_link"
                title="ArchGemini Feedback Form"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
}
