import { PathLike, statSync } from "fs";
import { isDir } from "../path-type/is-dir";
import { basename } from "path";
import { formatDate } from "../format-date";

export type folderInfoType =
    | {
          n: string;
          d: number[]; // [month, date, year, hour, minutes]
          skip?: true;
      }
    | {
          skip: true;
          n?: string;
          d?: number[]; // [month, date, year, hour, minutes]
      };

export function getFolderInfo(folderPath: PathLike): folderInfoType {
    if (isDir(folderPath)) {
        let stat = statSync(folderPath);

        return {
            n: basename(folderPath as string),
            d: formatDate(stat.mtime),
        };
    }

    return { skip: true };
}
