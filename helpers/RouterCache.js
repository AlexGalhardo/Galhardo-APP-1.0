const NodeCache = require('node-cache');
const cache = new NodeCache()

module.exports = duration => (req, res, next) => {
    // is request a GET?

    // if not, call next
    if(req.method !== 'GET'){
        return next();
    }

    // check if key exists in cache
    const key = req.originalUrl;
    const cachedResponse = cache.get(key)

    // if it exists, send cache result
    if(cachedResponse){
        res.send(cachedResponse);
    } else {
         // if not, replace .send with method to set response to cache
        res.originalSend = res.send
        res.send = body => {
            res.originalSend(body);
            cache.set(key, body, duration)
        }
        next()
    }
}
