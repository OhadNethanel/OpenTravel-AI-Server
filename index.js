const express = require("express");
const app = express();
require("dotenv/config");

const verbose = require("./src/utils/verbose");
const port = process.env.PORT || 80;

const pageNotFound404 = require("./src/utils/pageNotFound404");

//middlewares
app.use(express.json()); //json parser middleware
//add REST api headers
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization,Checksum, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//routes
const travelRouter = require("./src/routes/travel");
app.use("/api/travel/", travelRouter);

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", (req, res) => {
  res.status(404).send(pageNotFound404);
});

app.listen(port, () => {
  verbose(`server is listening to ${port}`);
});


