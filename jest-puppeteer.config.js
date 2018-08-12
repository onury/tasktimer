// jest-puppeteer config
module.exports = {
    // launch: {
    //     dumpio: true,
    //     headless: process.env.HEADLESS !== 'false',
    // },
    server: {
        command: 'node test/_server',
        port: 5001
    }
};