/*
https://docs.pagar.me/reference#seguran%C3%A7a-1

var fs = require('fs');
const request = require("request");
var body = JSON.parse(fs.readFileSync('body.json', 'utf8'));

var options = {
    method: 'POST',
    uri: 'https://api.pagar.me/core/v5/orders',
    headers: {
      'Authorization': 'Basic ' + new Buffer("sk_test_tra6ezsW3BtPPXQa:").toString('base64'),
      'Content-Type': 'application/json'
    },
    json : body
};

request(options, function(error, response, body) {
    console.log(response.body);
});

Para montar a requisição Basic Auth, você deve utilizar a SecretKey da seguinte maneira:
User: SecretKey
Password: vazio

*/
