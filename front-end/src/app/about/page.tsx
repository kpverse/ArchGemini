import { Metadata } from "next";
import style from "./page.module.scss";
import CommonHeader from "@/components/common/CommonHeader";
import Link from "next/link";
import { Fragment } from "react";
import rootPath from "@/metadata/root-path";
import ReloadMetadata from "@/components/common/ReloadMetadata";

export const metadata: Metadata = {
    title: "About - ArchGemini",
    icons: rootPath + "/favicon.ico",
};

export default function page() {
    return (
        <>
            <ReloadMetadata title={metadata.title as string} />
            <div className={style["about"]}>
                <CommonHeader title="Version 0.1.0" />

                <img
                    className={style["kp-img"]}
                    src="https://avatars.githubusercontent.com/u/82671701"
                    alt="Kartavya Patel"
                />

                <h1 className={style["kp"]}>Kartavya Patel</h1>

                <span className={style["who-is-kp"]}>
                    Creator of{" "}
                    <strong>
                        <Link target={"_blank"} href={"https://kpverse.in"}>
                            KPVERSE
                        </Link>
                    </strong>{" "}
                    and{" "}
                    <strong>
                        <Link
                            target={"_blank"}
                            href={"https://kpverse.in/archgemini"}
                        >
                            ArchGemini
                        </Link>
                    </strong>
                </span>

                <div className={style["story"]}>
                    <img
                        className={style["archgemini-og"]}
                        src={rootPath + "/archgemini-og.jpg"}
                        alt=""
                    />
                    <h2>The ArchGemini story</h2>
                    <p className={style["text"]}>
                        On one significant day, as I urgently needed to transfer
                        essential lab work files from the computer in my
                        college's laboratory to my own, the frustration of
                        dealing with external storage drives and compatibility
                        issues was at its peak. It was at that pivotal moment
                        that the concept of ArchGemini was born.
                    </p>
                    <p className={style["text"]}>
                        The name 'ArchGemini' reflects its essence -{" "}
                        <strong>'Arch' for Architectural or Structural</strong>{" "}
                        and <strong>'Gemini' for Twins</strong>. It's like a
                        magical twin-maker for the shared folder. ArchGemini
                        creates virtual twins of shared folder, originating from
                        the sender's device, and effortlessly mirrors them onto
                        the receiver's device over the local network, on demand.
                    </p>
                    <p className={style["text"]}>
                        What's even more remarkable is that ArchGemini plays
                        well with all sorts of oper ating systems, whether it's
                        a <strong>macOS</strong>, <strong>Windows</strong>, or{" "}
                        <strong>Linux</strong> distributions. No more fretting
                        over physical storage drives or compatibility concerns.
                        ArchGemini is your go-to solution for swift and seamless
                        folder sharing via the local network, all while keeping
                        your data securely within the boundaries of your
                        network.
                    </p>
                    <p className={style["text"]}>
                        Just as twins share a unique bond, ArchGemini
                        effortlessly connects the receiver's device to the
                        shared folder of the sender's device.
                    </p>

                    <div className={style["author"]}>
                        <span></span>
                        <span className={style["author-name"]}>
                            - Kartavya Patel
                        </span>
                    </div>
                </div>

                <p className={style["connect-with-us"]}>Let's connect</p>
                <div className={style["social"]}>
                    {[
                        { text: "X", url: "https://x.com/thekpverse" },
                        {
                            text: "YouTube",
                            url: "https://youtube.com/@thekpverse",
                        },
                        {
                            text: "LinkedIn",
                            url: "https://linkedin.com/in/kartavyapatel",
                        },
                        {
                            text: "GitHub (KPVERSE)",
                            url: "https://github.com/kpverse",
                        },
                        {
                            text: "GitHub (Personal)",
                            url: "https://github.com/patelka2211",
                        },
                        { text: "Medium", url: "https://medium.com/@kpverse" },

                        { text: "Email", url: "mailto:thekpverse@gmail.com" },
                        {
                            text: "Mastodon",
                            url: "https://mastodon.social/@kpverse",
                        },
                    ].map(({ text, url }, index) => {
                        return (
                            <Fragment key={text}>
                                {index === 0 ? (
                                    <></>
                                ) : (
                                    <span className={style["separator"]}>
                                        ·
                                    </span>
                                )}
                                <Link
                                    target={"_blank"}
                                    href={url}
                                    className={style["link"]}
                                >
                                    {text}
                                </Link>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
