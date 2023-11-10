"use client";
import rootPath from "@/metadata/root-path";
import { useEffect, useState } from "react";

export default function VideoLoader({ className }: { className: string }) {
    const [hasLoadedBefore, setHasLoadedBefore] = useState(false);

    useEffect(() => {
        // Check if a flag in sessionStorage indicates the first load
        const hasLoadedBeforeSession =
            sessionStorage.getItem("has-loaded-before") === "true";

        if (!hasLoadedBeforeSession) {
            // Set the flag in sessionStorage to indicate that the website has loaded before
            sessionStorage.setItem("has-loaded-before", "true");

            // Update the state to prevent this code from running again
            setHasLoadedBefore(true);
        }
    }, []);
    return (
        <>
            {hasLoadedBefore === true ? (
                <video
                    className={className}
                    src={rootPath + "/archgemini-from-kpverse.webm"}
                    poster={rootPath + "/archgemini-poster.jpg"}
                    autoPlay
                    muted
                    playsInline
                ></video>
            ) : undefined}

            {hasLoadedBefore === false ? (
                //  eslint-disable-next-line @next/next/no-img-element
                <img
                    className={className}
                    src={rootPath + "/archgemini-from-kpverse.jpg"}
                    alt=""
                />
            ) : undefined}
        </>
    );
}
