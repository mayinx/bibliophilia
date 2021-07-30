const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const articlesRouter = require("./routes/articles");
const authorsRouter = require("./routes/authors");
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
    "/articles": "read and create new articles",
    "/articles/:id": "read, update and delete an individual article",
    "/authors": "read and create new articles",
    "/api/books": "read and create new books",
  });
});

app.use("/articles", articlesRouter);
app.use("/authors", authorsRouter);
app.use("/api/books", booksRouter);

/*
  We have to start the server. We make it listen on the port 4000

*/
mongoose
  .connect("mongodb://localhost:27017/blog-api", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    ignoreUndefined: true, // BSON serializer should ignore undefined fields (liek in query params).
  })
  .then(() => {
    console.log("Connecteed to mongo");
    app.listen(4000, () => {
      console.log("Listening on http://localhost:4000");
    });
  })
  .catch((error) => {
    console.error(error);
  });
