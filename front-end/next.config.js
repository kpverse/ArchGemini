const productionSettings = require("./src/metadata/production-settings.js");

console.log(
    `${productionSettings.PRODUCTION ? "In" : "Not in"} production mode.\n`
);

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    output: "export",
    assetPrefix: productionSettings.PRODUCTION ? "/archgemini/" : undefined,
};

module.exports = nextConfig;
