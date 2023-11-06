import { Metadata } from "next";
import style from "./page.module.scss";
import CommonHeader from "@/components/common/CommonHeader";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About ArchGemini",
};

export default function page() {
    return (
        <div className={style["about"]}>
            <CommonHeader title="About ArchGemini" />
            <img
                src="https://avatars.githubusercontent.com/u/82671701"
                alt="Kartavya Patel"
            />
            <h1>Kartavya Patel</h1>
            <span className={style["who-is-kp"]}>
                Creator of{" "}
                <strong>
                    <Link target={"_blank"} href={"https://kpverse.in"}>
                        KPVERSE
                    </Link>
                </strong>{" "}
                and <strong>ArchGemini</strong>
            </span>

            <div className={style["story"]}>
                <h2>The ArchGemini story</h2>
                <p>
                    On one day, when I needed to take some education-related
                    files from the computer of my college's laboratory, I didn't
                    wanted to deal with the hassle of external storage drives or
                    worry about compatibility issues. That's when the concept of
                    ArchGemini was born.
                </p>
                <p>
                    The name 'ArchGemini' reflects its essence - 'Arch' for
                    Architectural and 'Gemini' for Twins. It's like a magical
                    twin-maker for your folders. ArchGemini creates virtual
                    twins of shared folders, originating from the sender's
                    device, and effortlessly mirrors them onto the receiver's
                    device via the local network, on demand.
                </p>
                <p>
                    What's even more remarkable is that ArchGemini plays well
                    with all sorts of devices, whether it's a Mac, Windows, or
                    Linux. No more fretting over physical storage drives or
                    compatibility concerns. ArchGemini is your go-to solution
                    for swift and seamless local network sharing, all while
                    keeping your data securely within the boundaries of your
                    network.
                </p>

                <p>
                    Just as twins share a unique bond, ArchGemini effortlessly
                    connects shared folders from the sender's device to the
                    receiver's device.
                </p>
            </div>

            <p className={style["connect-with-us"]}>Let's connect</p>
            <div className={style["social"]}>
                <Link
                    target={"_blank"}
                    href={"https://x.com/thekpverse"}
                    className={style["link"]}
                >
                    X
                </Link>
                <span className={style["separator"]}>·</span>
                <Link
                    target={"_blank"}
                    href={"https://youtube.com/@thekpverse"}
                    className={style["link"]}
                >
                    YouTube
                </Link>
                <span className={style["separator"]}>·</span>
                <Link
                    target={"_blank"}
                    href={"https://linkedin.com/in/kartavyapatel"}
                    className={style["link"]}
                >
                    LinkedIn
                </Link>
                <span className={style["separator"]}>·</span>
                <Link
                    target={"_blank"}
                    href={"https://github.com/kpverse"}
                    className={style["link"]}
                >
                    GitHub (KPVERSE)
                </Link>
                <span className={style["separator"]}>·</span>
                <Link
                    target={"_blank"}
                    href={"https://github.com/patelka2211"}
                    className={style["link"]}
                >
                    GitHub (Personal)
                </Link>
                <span className={style["separator"]}>·</span>
                <Link
                    target={"_blank"}
                    href={"https://medium.com/@kpverse"}
                    className={style["link"]}
                >
                    Medium
                </Link>
                <span className={style["separator"]}>·</span>
                <Link
                    target={"_blank"}
                    href={"mailto:thekpverse@gmail.com"}
                    className={style["link"]}
                >
                    Email
                </Link>
                <span className={style["separator"]}>·</span>
                <Link
                    target={"_blank"}
                    href={"https://mastodon.social/@kpverse"}
                    className={style["link"]}
                >
                    Mastodon
                </Link>
            </div>
        </div>
    );
}
