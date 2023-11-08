"use client";
import { useEffect } from "react";

export default function ReloadMetadata({ title }: { title: string }) {
    useEffect(() => {
        document.title = title;
    }, []);
    return <></>;
}
