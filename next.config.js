const { pipeline } = require('stream')

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['tesseract.js'],
    },
    env: {
        userID: process.env.userID,
        ulcaApiKey: process.env.ulcaApiKey,
        pipelineId: process.env.pipelineId
    },
    output : "standalone",
    staticPageGenerationTimeout: 1000,
}

module.exports = nextConfig
