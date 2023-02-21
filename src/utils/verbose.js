const catchReqIP = require("./catchReqIP");
const getCurrentTimeStamp = require("./getCurrentTimeStamp");

module.exports = (msg, req = false) => {
  if (req)
    return console.log(
      `${getCurrentTimeStamp()} :: ${catchReqIP(req)} - ${msg}`
    );
  console.log(`${getCurrentTimeStamp()} - ${msg}`);
};
