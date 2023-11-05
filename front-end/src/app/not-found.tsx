import rootPath from "@/metadata/root-path";
import style from "./not-found.module.scss";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "404 - Page Not Found! - ArchGemini",
};

export default function page() {
    return (
        <div className={style["not-found-frame"]}>
            <div className={style["not-found-content"]}>
                <img src={rootPath + "/archgemini-from-kpverse.jpg"} alt="" />
                <h1>404 - Page Not Found</h1>
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
    );
}
