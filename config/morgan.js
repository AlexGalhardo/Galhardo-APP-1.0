const morgan = require("morgan");
const Logger = require("./winston");

const stream = morgan.StreamOptions = {
    write: (message) => Logger.http(message),
};

const morganMiddleware = morgan(
    ":method :url :status  :response-time ms",
    { stream }
);

module.exports = morganMiddleware;
