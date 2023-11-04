import Link from "next/link";
import Icons from "./Icons";
import style from "./ContentTable.module.scss";
import productionSettings from "@/metadata/production-settings";

export type folderInfoType = {
    n: string;
    d: number[]; // [month, date, year, hour, minutes]
};

export type fileInfoType = {
    n: string;
    d: number[]; // [month, date, year, hour, minutes]
    s: string;
};

function formatTime(dateList: number[]) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const monthIndex = dateList[0];
    const month = months[monthIndex];
    const date = dateList[1];
    const year = dateList[2];
    let hour = dateList[3];
    let minute = dateList[4];

    // Add leading zero to hour and minute if they are less than 10
    let hourFormat = hour < 10 ? `0${hour}` : hour;
    let minuteFormat = minute < 10 ? `0${minute}` : minute;

    return `${date} ${month} ${year}, ${hourFormat}:${minuteFormat}`;
}

export default function ContentTable({
    path,
    folderObject,
    fileObject,
}: {
    path: string;
    folderObject?: folderInfoType[];
    fileObject?: fileInfoType[];
}) {
    if (folderObject === undefined && fileObject === undefined) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <strong>No data to show</strong>
                    <Link
                        href={"./"}
                        style={{
                            backgroundColor: "black",
                            padding: "6px 12px",
                            color: "white",
                            fontSize: "20px",
                            marginTop: "16px",
                            borderRadius: "6px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Go to root folder
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <table className={style["table"]}>
            <tbody>
                <tr>
                    <td>
                        <strong>Name</strong>
                    </td>
                    <td>
                        <strong>Size</strong>
                    </td>
                    <td>
                        <strong>Date Modified</strong>
                    </td>
                </tr>
                {folderObject ? (
                    folderObject.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <Link href={`?path=${path}/${item.n}/`}>
                                        <Icons type={"Folder"} />
                                        <span>{item.n}</span>
                                    </Link>
                                </td>
                                <td></td>
                                <td>{formatTime(item.d)}</td>
                            </tr>
                        );
                    })
                ) : (
                    <></>
                )}

                {fileObject ? (
                    fileObject.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td title={`Download ${item.n}`}>
                                    <Link
                                        href={`${
                                            productionSettings.PRODUCTION
                                                ? ""
                                                : productionSettings.BACKEND_SERVER_URL_ORIGIN
                                        }/archgemini/_api/download/file?path=${path}/${
                                            item.n
                                        }`}
                                        target={"_blank"}
                                    >
                                        <Icons type={"File"} />
                                        <span>{item.n}</span>
                                    </Link>
                                </td>
                                <td>{item.s}</td>
                                <td>{formatTime(item.d)}</td>
                            </tr>
                        );
                    })
                ) : (
                    <></>
                )}
            </tbody>
        </table>
    );
}
