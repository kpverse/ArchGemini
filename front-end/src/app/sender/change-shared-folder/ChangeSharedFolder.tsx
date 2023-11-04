"use client";
import { useState } from "react";
import style from "./page.module.scss";
import { useRouter } from "next/navigation";
import rootPath from "@/metadata/root-path";
import productionSettings from "@/metadata/production-settings";

export default function ChangeSharedFolder() {
    const [inputValue, setInputValue] = useState(""),
        [responseMsg, setResponseMsg] = useState(""),
        router = useRouter();

    async function updateFolder() {
        if (inputValue === "") {
            setResponseMsg("Input is empty.");

            setTimeout(() => {
                setResponseMsg("");
            }, 2000);

            return;
        }

        try {
            let API_END_POINT = `${
                productionSettings.PRODUCTION
                    ? ""
                    : productionSettings.BACKEND_SERVER_URL_ORIGIN
            }/archgemini/_api/share-path`;

            let response = (await (
                await fetch(API_END_POINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        path: inputValue,
                    }),
                })
            ).json()) as {
                status:
                    | "YOU_DONT_HAVE_PERMISSION_TO_CHANGE"
                    | "PATH_IS_NOT_GIVEN"
                    | "PATH_SHARED"
                    | "PATH_DO_NOT_EXIST"
                    | "NOT_A_DIRECTORY";
            };

            if (response.status === "PATH_SHARED") {
                setResponseMsg("Folder shared successfully.");

                setTimeout(() => {
                    router.push(rootPath + "/sender/");
                }, 2000);
                return;
            } else if (response.status === "NOT_A_DIRECTORY")
                setResponseMsg("Input is not a folder.");
            else if (response.status === "PATH_DO_NOT_EXIST")
                setResponseMsg("Folder does not exist.");
            else if (response.status === "PATH_IS_NOT_GIVEN")
                setResponseMsg("Folder path not given.");
            else if (response.status === "YOU_DONT_HAVE_PERMISSION_TO_CHANGE")
                setResponseMsg(
                    "You don't have permission to change shared folder."
                );
        } catch {
            setResponseMsg("Some error occurred while .");
        }

        setTimeout(() => {
            setResponseMsg("");
        }, 2000);
    }

    return (
        <>
            {responseMsg !== "" ? (
                <div className={style["response-msg"]}>{responseMsg}</div>
            ) : undefined}

            <input
                className={style["new-folder-input"]}
                type="text"
                placeholder="Paste folder path here"
                onChange={(event) => {
                    setInputValue(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") updateFolder();
                }}
            />

            <button className={style["share-btn"]} onClick={updateFolder}>
                Share Folder
            </button>
        </>
    );
}
