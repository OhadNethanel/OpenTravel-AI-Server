module.exports = (req) => {
  let ip = "";
  try {
    ip = req?.headers["x-forwarded-for"] || req?.socket?.remoteAddress || "";
    ip = ip.replace(/f/g, "");
    ip = ip.replace(/:/g, "");
    return ip;
  } catch {
    return "0";
  }
};
