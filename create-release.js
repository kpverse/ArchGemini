const archiver = require("archiver");
const fs = require("fs");
const path = require("path");

// Create a writable stream for the zip file
const output = fs.createWriteStream("release.zip");
const archive = archiver("zip", {
    zlib: { level: 9 }, // compression level
});

// Specify the files and folders to be included in the zip
const filesToZip = [
    "back-end/bin/index.cjs.js",
    "front-end/out/",
    "LICENSE",
    "package.json",
    "README.md",
];

// Listen for all archive data to be written
output.on("close", () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log(
        "archiver has been finalized and the output file descriptor has closed."
    );
});

archive.on("warning", (err) => {
    if (err.code === "ENOENT") {
        console.warn(err);
    } else {
        // throw error
        throw err;
    }
});

archive.on("error", (err) => {
    throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files and folders to the archive
filesToZip.forEach((fileOrFolder) => {
    const fullPath = path.resolve(__dirname, fileOrFolder);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) archive.directory(fullPath, fileOrFolder);
    else archive.file(fullPath, { name: fileOrFolder });
});

// Finalize the archive (write the zip file)
archive.finalize();
