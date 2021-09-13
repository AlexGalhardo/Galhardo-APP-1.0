// https://github.com/pinojs/pino-pretty

const PinoLog = require('pino')({
    level: 'debug',
    prettyPrint: {
        levelFirst: true,
        colorize: true
    }
})

module.exports = PinoLog;
