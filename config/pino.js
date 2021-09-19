// https://github.com/pinojs/pino-pretty
import pino from 'pino'

const PinoLog = pino({
    level: 'debug',
    prettyPrint: {
        levelFirst: true,
        colorize: true
    }
})

export default PinoLog
