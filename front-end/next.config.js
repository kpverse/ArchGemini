const productionSettings = require("./src/metadata/production-settings.js");

console.log(
    `\n${
        productionSettings.PRODUCTION
            ? "In production mode"
            : "Not in production mode"
    }`
);

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    output: "export",
    assetPrefix: productionSettings.PRODUCTION ? "/archgemini/" : undefined,
};

module.exports = nextConfig;
