import { Fragment } from "react";
import style from "./GetArch.module.scss";
import Link from "next/link";
import ContentTable, { fileInfoType, folderInfoType } from "./ContentTable";

export default function GetArch({
    fileObject,
    folderObject,
    pathListObject,
}: {
    fileObject?: fileInfoType[];
    folderObject?: folderInfoType[];
    pathListObject?: string[];
}) {
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
