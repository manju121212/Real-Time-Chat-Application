const express = require("express");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup Cross Origin
app.use(cors({
  origin:"http://localhost:3000",
}));
 

  //intercept the OPTIONS call so we don't double up on calls to the integration
 
//Bring in the routes
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

//Setup Error Handlers
const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
