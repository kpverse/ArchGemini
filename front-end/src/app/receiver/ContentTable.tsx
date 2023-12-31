import Link from "next/link";
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

function Icons({ type }: { type: "Folder" | "File" }) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {type === "File" ? (
                <path
                    d="M52.3731 51.4029C52.3731 50.806 52.1493 50.2886 51.7015 49.8507C51.2537 49.413 50.7214 49.1941 50.1045 49.1941C49.4876 49.1941 48.9552 49.413 48.5075 49.8507C48.0597 50.2886 47.8358 50.806 47.8358 51.4029V62.2389L48.0149 67.1046L45.4776 64.4777L42.791 61.7312C42.5721 61.5124 42.3184 61.3432 42.0299 61.2238C41.7413 61.1044 41.4577 61.0447 41.1791 61.0447C40.5821 61.0447 40.0846 61.2388 39.6866 61.627C39.2886 62.015 39.0896 62.5075 39.0896 63.1046C39.0896 63.4429 39.1542 63.7413 39.2836 63.9999C39.4129 64.2587 39.597 64.4975 39.8358 64.7164L48.4328 72.6269C48.7513 72.9254 49.0348 73.1294 49.2836 73.2388C49.5324 73.3483 49.806 73.403 50.1045 73.403C50.403 73.403 50.6766 73.3483 50.9254 73.2388C51.1741 73.1294 51.4577 72.9254 51.7761 72.6269L60.3732 64.7164C60.6121 64.4975 60.7961 64.2587 60.9253 63.9999C61.0547 63.7413 61.1194 63.4429 61.1194 63.1046C61.1194 62.5075 60.9204 62.015 60.5224 61.627C60.1244 61.2388 59.6269 61.0447 59.0298 61.0447C58.7313 61.0447 58.4427 61.1044 58.1642 61.2238C57.8856 61.3432 57.6369 61.5124 57.418 61.7312L54.7313 64.4777L52.194 67.1046L52.3731 62.2389V51.4029ZM34.2537 82H65.9551C69.0397 82 71.3532 81.2189 72.8954 79.6567C74.4378 78.0945 75.209 75.7612 75.209 72.6568V45.5522C75.209 44.2587 75.1393 43.1741 74.9999 42.2985C74.8608 41.4229 74.5872 40.6219 74.1792 39.8955C73.7712 39.1692 73.1692 38.398 72.373 37.5821L55.9254 20.8358C55.1692 20.0597 54.4328 19.4677 53.7164 19.0597C53 18.6517 52.2189 18.3731 51.3731 18.2239C50.5274 18.0746 49.5473 18 48.4328 18H34.2537C31.1691 18 28.8557 18.7861 27.3134 20.3582C25.7711 21.9304 25 24.2687 25 27.3731V72.6568C25 75.7812 25.7711 78.1195 27.3134 79.6717C28.8557 81.2239 31.1691 82 34.2537 82ZM34.4627 77.1939C32.9303 77.1939 31.7711 76.7959 30.9851 76C30.199 75.204 29.806 74.0598 29.806 72.5673V27.4627C29.806 25.9901 30.199 24.8458 30.9851 24.0299C31.7711 23.2139 32.9403 22.806 34.4925 22.806H47.7761V40.1492C47.7761 42.0199 48.2438 43.4229 49.1791 44.3582C50.1144 45.2935 51.5174 45.7612 53.3881 45.7612H70.4029V72.5673C70.4029 74.0598 70.0099 75.204 69.224 76C68.4378 76.7959 67.2686 77.1939 65.7164 77.1939H34.4627ZM53.9254 41.2537C53.3284 41.2537 52.9055 41.1244 52.6567 40.8657C52.408 40.607 52.2836 40.1791 52.2836 39.5821V23.7313L69.4777 41.2537H53.9254Z"
                    fill="black"
                    fillOpacity={0.85}
                />
            ) : (
                <></>
            )}

            {type === "Folder" ? (
                <path
                    d="M26.849 75.5721H73.9966C76.5141 75.5721 78.4774 74.8441 79.8865 73.3881C81.2955 71.932 82 69.7479 82 66.836V37.8935C82 35.0002 81.2579 32.8208 79.7736 31.3554C78.2896 29.8899 76.082 29.1572 73.151 29.1572H46.0969C45.1387 29.1572 44.3309 29.0304 43.6733 28.7767C43.0157 28.5231 42.33 28.0957 41.6161 27.4945L39.897 26.0854C39.277 25.5594 38.6805 25.146 38.1075 24.8454C37.5344 24.5448 36.9051 24.3288 36.2193 24.1973C35.5336 24.0658 34.7304 24 33.8098 24H25.7781C23.2981 24 21.3818 24.7045 20.0291 26.1136C18.6764 27.5227 18 29.6457 18 32.4826V66.836C18 69.7479 18.7374 71.932 20.2122 73.3881C21.6871 74.8441 23.8993 75.5721 26.849 75.5721ZM26.9053 71.0348C25.4963 71.0348 24.416 70.6638 23.6645 69.9217C22.913 69.1795 22.5372 68.0757 22.5372 66.6103V32.7362C22.5372 31.346 22.8942 30.2939 23.6081 29.5799C24.322 28.866 25.3554 28.509 26.7081 28.509H32.6543C33.5937 28.509 34.3875 28.6405 35.0357 28.9036C35.6839 29.1666 36.3649 29.5987 37.0789 30.1999L38.7979 31.6372C39.3991 32.1444 39.9909 32.5484 40.5734 32.849C41.1558 33.1496 41.7946 33.3656 42.4897 33.4972C43.1848 33.6287 43.9927 33.6944 44.9133 33.6944H73.0665C74.4569 33.6944 75.5372 34.0702 76.3075 34.8217C77.0778 35.5732 77.463 36.6816 77.463 38.1471V66.6386C77.463 68.0851 77.0778 69.1795 76.3075 69.9217C75.5372 70.6638 74.4569 71.0348 73.0665 71.0348H26.9053ZM20.7618 44.0088H79.21V39.7534H20.7618V44.0088Z"
                    fill="black"
                />
            ) : (
                <></>
            )}
        </svg>
    );
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
                    padding: "16px",
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
