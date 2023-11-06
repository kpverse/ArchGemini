import rootPath from "@/metadata/root-path";
import style from "./page.module.scss";
import Link from "next/link";
import MoreLinks from "@/components/common/MoreLinks";

export default function HomePage({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <div className={style["not-found-frame"]}>
                <div className={style["not-found-content"]}>
                    <img
                        src={rootPath + "/archgemini-from-kpverse.jpg"}
                        alt=""
                    />
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
