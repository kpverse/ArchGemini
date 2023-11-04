"use client";
import style from "./sender-window.module.scss";
import QrAndWarning from "./QrAndWarning";
import VideoLoader from "../common/VideoLoader";

export default function SenderWindow({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={style["frame"]}>
            <div className={style["main-window"]}>
                <VideoLoader className={style["video-and-image"]} />
                <QrAndWarning />
                {children}
            </div>
        </div>
    );
}
