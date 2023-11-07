import Link from "next/link";
import style from "./MoreLinks.module.scss";
import rootPath from "@/metadata/root-path";

export default function MoreLinks() {
    return (
        <div className={style["more-links"]}>
            <div className={style["content"]}>
                <div className={style["links"]}>
                    <Link className={style["link"]} href={rootPath + "/about"}>
                        About
                    </Link>
                    <span className={style["separator"]}>·</span>
                    <Link
                        className={style["link"]}
                        href={"https://kpverse.in/archgemini/feedback"}
                    >
                        Feedback
                    </Link>
                    <span className={style["separator"]}>·</span>
                    <Link
                        className={style["link"]}
                        href={rootPath + "/tutorial"}
                    >
                        Tutorial
                    </Link>
                    <span className={style["separator"]}>·</span>
                </div>
                <span className={style["copyright"]}>
                    &copy;{" "}
                    <Link target={"_blank"} href={"https://kpverse.in"}>
                        KPVERSE
                    </Link>
                    . All Rights Reserved.
                </span>
            </div>
        </div>
    );
}
