import VideoLoader from "../common/VideoLoader";
import style from "./receiver-window.module.scss";

export default function ReceiverWindow({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div className={style["receiver-window"]}>
            <VideoLoader className={style["video-and-image"]} />
            {children}
        </div>
    );
}
