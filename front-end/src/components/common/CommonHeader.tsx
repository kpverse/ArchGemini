"use client";
import { useRouter } from "next/navigation";
import style from "./CommonHeader.module.scss";
import Link from "next/link";
import rootPath from "@/metadata/root-path";

export default function CommonHeader({ title }: { title: string }) {
    let { back } = useRouter();

    return (
        <div className={style["header"]}>
            <button className={style["nav-btns"]} onClick={back}>
                Back
            </button>
            <span className={style["title"]}>{title}</span>
            <Link href={rootPath + "/"} className={style["nav-btns"]}>
                Home
            </Link>
        </div>
    );
}
