import Morgan from "morgan"
import Logger from "./winston.js"

const stream = Morgan.StreamOptions = {
    write: (message) => Logger.http(message),
};

const morgan = Morgan(
    ":method :url :status  :response-time ms",
    { stream }
);

export default morgan;
