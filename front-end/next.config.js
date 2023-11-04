const productionSettings = require("./src/metadata/production-settings.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    output: "export",
    assetPrefix: productionSettings.PRODUCTION ? "/archgemini/" : undefined,
};

module.exports = nextConfig;
