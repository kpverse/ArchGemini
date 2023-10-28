import { PathLike, statSync } from "fs";
import { isFile } from "../path-type/is-file";
import { basename } from "path";
import { formatDate } from "../format-date";

export type fileInfoType =
    | {
          n: string;
          d: number[]; // [month, date, year, hour, minutes]
          s: string;
          skip?: true;
      }
    | {
          skip: true;
          n?: string;
          d?: number[]; // [month, date, year, hour, minutes]
          s?: string;
      };

function formatFileSize(bytes: number) {
    if (bytes < 1024) return bytes + ` byte${bytes === 1 ? "" : "s"}`;
    else if (bytes < 1024 ** 2) return (bytes / 1024).toFixed(1) + " KB";
    else if (bytes < 1024 ** 3) return (bytes / 1024 ** 2).toFixed(1) + " MB";
    else return (bytes / 1024 ** 3).toFixed(1) + " GB";
}

export function getFileInfo(filePath: PathLike): fileInfoType {
    if (isFile(filePath) === true) {
        let stat = statSync(filePath);

        return {
            n: basename(filePath as string),
            d: formatDate(stat.mtime),
            s: formatFileSize(stat.size),
        };
    }

    return {
        skip: true,
    };
}
