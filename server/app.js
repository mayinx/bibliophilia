require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const booksRouter = require("./routes/books");

/*
  We create an express app calling
  the express function.
*/
const app = express();

/*
  We setup middleware to:
  - parse the body of the request to json for us
  https://expressjs.com/en/guide/using-middleware.html

  Application Level Middleware
*/
app.use(cors());
app.use(express.json());
app.use(function logRequests(req, res, next) {
  console.log("----------------------------------");
  console.log(new Date().toString());
  console.log(`${req.method} ${req.url}`);
  next();
});

/*
  Endpoint to handle GET requests to the root URI "/"
*/
app.get("/", (req, res) => {
  console.log("h1");
  res.json({
    "/api/books": "read and create new books",
    "/api/books/:id": "read, update and delete an individual book",
  });
});

app.use("/api/books", booksRouter);

/*
  We have to start the server. We make it listen on the port 4000

*/

/* in production: Serve the production ready React app and re-route
client-side routes to index.html.  */
if (process.env.NODE_ENV === "production") {
  console.log("yohoooo");
  // Serve static files from the React frontend app
  // app.use(express.static(path.join(__dirname, "client/build")));
  app.use(express.static(path.join(__dirname, "..", "client/build")));
  // Handle React routing, return all requests to React app
  // Anything that doesn't match the above, send back index.html
  app.get("*", (req, res) => {
    // res.sendFile(path.join(__dirname + "/client/build/index.html"));
    res.sendFile(path.join(__dirname, "..", "client/build", "index.html"));
  });
}

const { MONGO_URI, PORT } = process.env;
console.log("MONGO_URI", MONGO_URI);
console.log(process.env);

mongoose
  // .connect("mongodb://localhost:27017/blog-api", {
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    ignoreUndefined: true, // BSON serializer should ignore undefined fields (liek in query params).
  })
  .then(() => {
    console.log("Connecteed to mongo");
    app.listen(PORT, () => {
      console.log("Listening on http://localhost:${PORT}");
    });
  })
  .catch((error) => {
    console.error(error);
  });
