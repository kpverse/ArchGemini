import SenderWindow from "@/components/sender/SenderWindow";
import { Metadata } from "next";
import style from "./page.module.scss";
import Link from "next/link";
import rootPath from "@/metadata/root-path";

export const metadata: Metadata = {
    title: "ArchGemini from KPVERSE",
    icons: rootPath + "/favicon.ico",
};

export default function SenderHome() {
    return (
        <SenderWindow>
            <Link
                className={style["change-shared-folder"]}
                href={rootPath + "/sender/change-shared-folder"}
            >
                <span>Change Shared Folder</span>
            </Link>
        </SenderWindow>
    );
}
