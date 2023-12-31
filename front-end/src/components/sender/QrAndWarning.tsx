"use client";
import style from "./sender-window.module.scss";
import { createQR } from "./qrcode";
import { useEffect, useState } from "react";

export default function QrAndWarning() {
    let [warningShown, setWarningShown] = useState(false),
        receiverUrlDefaultValue: string | undefined,
        [receiverUrl, setReceiverUrl] = useState(receiverUrlDefaultValue);

    useEffect(() => {
        const warningShownSession =
            sessionStorage.getItem("qr-warning-shown") === "true";

        if (warningShownSession) setWarningShown(true);
    }, []);

    useEffect(() => {
        setReceiverUrl(`${location.origin}/archgemini/receiver`);
    }, [setReceiverUrl]);

    return (
        <div className={style[warningShown ? "qr-code-frame" : "qr-warning"]}>
            {warningShown === true && typeof receiverUrl === "string" ? (
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className={style["qr-code"]}
                        src={createQR(receiverUrl)}
                        alt=""
                    />

                    <span>{receiverUrl}</span>

                    <span className={style["msg"]}>
                        Devices connected to the same network can scan this QR
                        code or open the link in browser to access the shared
                        folder.
                    </span>
                </>
            ) : undefined}

            {warningShown === false ? (
                <>
                    <p className={style["warning-msg"]}>
                        Please ensure that both the receiver device and the
                        sender device are{" "}
                        <span>
                            <strong>connected to the same network</strong>.
                        </span>
                    </p>

                    <button
                        className={style["show-qr"]}
                        onClick={() => {
                            setWarningShown(true);
                            window.sessionStorage.setItem(
                                "qr-warning-shown",
                                "true"
                            );
                        }}
                    >
                        Show QR
                    </button>
                </>
            ) : undefined}
        </div>
    );
}
