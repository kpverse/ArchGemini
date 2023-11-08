import rootPath from "@/metadata/root-path";
import style from "./page.module.scss";
import Link from "next/link";
import MoreLinks from "@/components/common/MoreLinks";
import VideoLoader from "@/components/common/VideoLoader";
import { Metadata } from "next";
import ReloadMetadata from "@/components/common/ReloadMetadata";

export const metadata: Metadata = {
    title: "ArchGemini from KPVERSE",
    icons: rootPath + "/favicon.ico",
};

export default function HomePage({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <ReloadMetadata title={metadata.title as string} />
            <div className={style["frame"]}>
                <div className={style["content"]}>
                    <VideoLoader className={style["video-loader"]} />
                    {children}
                    <p>Available services</p>
                    <div className={style["services"]}>
                        <Link
                            href={rootPath + "/sender"}
                            className={style["service"]}
                        >
                            <span>Sender</span>
                        </Link>
                        <Link
                            href={rootPath + "/receiver"}
                            className={style["service"]}
                        >
                            <span>Receiver</span>
                        </Link>
                    </div>
                </div>
            </div>
            <MoreLinks />
        </>
    );
}
