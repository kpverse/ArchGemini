"use client";
import GetArch from "./GetArch";
import style from "./ExplorerFrame.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fileInfoType, folderInfoType } from "./ContentTable";
import productionSettings from "@/metadata/production-settings";
import rootPath from "@/metadata/root-path";
import Link from "next/link";
import Head from "next/head";

type responseData =
    | {
          fld?: folderInfoType[] | undefined;
          fls?: fileInfoType[] | undefined;
          pls: string[];
          //
          status?: "REQUEST_FROM_SENDER" | "PATH_IS_NOT_FOLDER";
      }
    | {
          status: "REQUEST_FROM_SENDER" | "PATH_IS_NOT_FOLDER";
          //
          fld?: folderInfoType[] | undefined;
          fls?: fileInfoType[] | undefined;
          pls?: string[];
      };

export default function ExplorerFrame() {
    let responseStatusDummyValue:
            | undefined
            | "REQUEST_FROM_SENDER"
            | "PATH_IS_NOT_FOLDER"
            | "CAN_GO_AHEAD",
        fileObjectDummyValue: undefined | fileInfoType[],
        folderObjectDummyValue: undefined | folderInfoType[],
        pathListObjectDummyValue: undefined | string[];

    let searchParams = useSearchParams(),
        [fileObject, setFileObject] = useState(fileObjectDummyValue),
        [folderObject, setFolderObject] = useState(folderObjectDummyValue),
        [pathListObject, setPathListObject] = useState(
            pathListObjectDummyValue
        ),
        [responseStatus, setResponseStatus] = useState(
            responseStatusDummyValue
        ),
        { replace } = useRouter();

    async function dataFetcher(path: string | null) {
        try {
            if (path === null) replace(rootPath + "/receiver?path=/");

            let response = await fetch(
                    `${
                        productionSettings.PRODUCTION
                            ? ""
                            : productionSettings.BACKEND_SERVER_URL_ORIGIN
                    }/archgemini/_api/get-arch?path=${path || "/"}`
                ),
                data: responseData = await response.json();

            if (data.status !== undefined) setResponseStatus(data.status);
            else {
                setPathListObject(data.pls);
                setFileObject(data.fls);
                setFolderObject(data.fld);
                setResponseStatus("CAN_GO_AHEAD");
            }
        } catch {
            setResponseStatus(undefined);
        }
    }

    useEffect(() => {
        dataFetcher(searchParams.get("path"));
    }, [searchParams]);

    useEffect(() => {
        if (pathListObject) {
            if (pathListObject.length > 1)
                document.title = `${
                    pathListObject[pathListObject.length - 1]
                } - ArchGemini`;
            else document.title = "ArchGemini from KPVERSE";
        } else document.title = `😬 Oops! Nothing to show - ArchGemini`;
    }, [pathListObject]);

    return (
        <div className={style["explorer-frame"]}>
            {responseStatus === "CAN_GO_AHEAD" ? (
                <GetArch
                    fileObject={fileObject}
                    folderObject={folderObject}
                    pathListObject={pathListObject}
                />
            ) : (
                <></>
            )}

            {responseStatus === "REQUEST_FROM_SENDER" ? (
                <div className={style["error-msgs"]}>
                    <span>
                        This is sender device. Other devices connected to the
                        same network can access shared folder.
                    </span>
                    <Link href={rootPath + "/sender"}>Go to sender page</Link>
                </div>
            ) : (
                <></>
            )}

            {responseStatus === "PATH_IS_NOT_FOLDER" ? (
                <div className={style["error-msgs"]}>
                    <span>Given path is not folder.</span>
                    <Link href={"./"}>Go to root folder</Link>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
