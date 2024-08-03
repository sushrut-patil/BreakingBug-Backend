const jwt = require("jsonwebtoken");

const createNewToken = (payload) => {
  //To access the env variables we use process.env not process.getuid;
  // return jwt.sign({ userId: payload }, process.getuid.SECRET_KEY, { expiresIn: '10d' });
  return jwt.sign({ userId: payload }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
};

// The module of createNewToken was not exported
module.exports = {createNewToken};
