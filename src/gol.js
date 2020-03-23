const csl = require("./rendering/console");

const something = () => 1;
csl.render(something);

module.exports = {
  something: something,
}
