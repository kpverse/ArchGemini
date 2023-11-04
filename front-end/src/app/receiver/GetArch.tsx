"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import style from "./GetArch.module.scss";
import Link from "next/link";
import ContentTable, { fileInfoType, folderInfoType } from "./ContentTable";
import productionSettings from "@/metadata/production-settings";
import Head from "next/head";

type responseData = {
    fld?: folderInfoType[] | undefined;
    fls?: fileInfoType[] | undefined;
    pls: string[];
};

export default function GetArch() {
    let dummyValue: string[] | fileInfoType[] | folderInfoType[] | undefined;

    let searchParams = useSearchParams(),
        [fileObject, setFileObject] = useState(dummyValue),
        [folderObject, setFolderObject] = useState(dummyValue),
        [pathListObject, setPathListObject] = useState(dummyValue),
        router = useRouter();

    async function dataFetcher(path: string | null) {
        try {
            if (path === null) {
                router.push("./?path=/");
                return;
            }

            let response = await fetch(
                    `${
                        productionSettings.PRODUCTION
                            ? ""
                            : productionSettings.BACKEND_SERVER_URL_ORIGIN
                    }/archgemini/_api/get-arch?path=${path}`
                ),
                data = (await response.json()) as responseData;

            setPathListObject(data.pls);
            setFileObject(data.fls || dummyValue);
            setFolderObject(data.fld || dummyValue);
        } catch {
            setPathListObject(undefined);
            setFileObject(undefined);
            setFolderObject(undefined);
        }
    }

    useEffect(() => {
        dataFetcher(searchParams.get("path"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <>
            {pathListObject ? (
                <div className={style["explorer-path-list"]}>
                    {pathListObject.map((value, index) => {
                        let typecastedValue = value as string;
                        return (
                            <Fragment key={index}>
                                {index === 0 ? (
                                    <></>
                                ) : (
                                    <div className={style["seperator"]}>/</div>
                                )}
                                <Link
                                    href={
                                        pathListObject
                                            ? "?path=" +
                                              (pathListObject as string[])
                                                  .map((value, innerIndex) => {
                                                      if (
                                                          innerIndex === 0 ||
                                                          innerIndex > index
                                                      )
                                                          return "";
                                                      else return `/${value}`;
                                                  })
                                                  .join("") +
                                              "/"
                                            : ""
                                    }
                                    className={style["list-item"]}
                                >
                                    <span>{typecastedValue}</span>
                                </Link>
                            </Fragment>
                        );
                    })}
                </div>
            ) : (
                <div
                    style={{
                        width: "100%",
                        height: "64px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                        border: "1px solid #e0e0e0",
                        borderTopLeftRadius: "24px",
                        borderTopRightRadius: "24px",
                    }}
                >
                    <strong>No paths found</strong>
                </div>
            )}

            <div className={style["explorer-path-content"]}>
                <ContentTable
                    path={
                        pathListObject
                            ? (pathListObject as string[])
                                  .map((value, index) => {
                                      if (index === 0) return "";
                                      else return value;
                                  })
                                  .join("/")
                            : ""
                    }
                    fileObject={fileObject as fileInfoType[] | undefined}
                    folderObject={folderObject as folderInfoType[] | undefined}
                />
            </div>
        </>
    );
}
