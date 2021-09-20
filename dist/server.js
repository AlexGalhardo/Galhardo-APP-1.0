"use strict";

var _express = _interopRequireDefault(require("express"));

require("./controllers/UsersController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.get('/', (request, response) => {
  return response.json({
    message: 'Galhardo APP TypeScript Version - In Development'
  });
});
app.listen(process.env.PORT || 3333, error => {
  if (error) throw new Error(error);
  console.log(`GalhardoAPP TYPESCRIPT running on port ${process.env.PORT || 3333}`);
});