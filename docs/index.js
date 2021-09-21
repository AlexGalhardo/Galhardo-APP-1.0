const basicInfo = require('./basicInfo')
const servers = require('./servers')
const components = require('./components')
const tags = require('./tags')

const endpoints = require('./endpoints')

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...endpoints
};
