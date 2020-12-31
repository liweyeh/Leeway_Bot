const _ = require("lodash");

const checkUser = (str) => {
  if (!_.isNil(str) && _.isString(str) && str.startsWith("<@!")) {
    return true;
  }
  return false;
};

module.exports = {
  checkUser: checkUser,
};
