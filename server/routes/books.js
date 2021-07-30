const express = require("express");
const router = express.Router();
const Book = require("../models/book");

/* CUSTOM MIDDLEWARE */
// EDIT: Not needed, sicne we validate on model level
// via mongoose validators
// function req, res, next) {
//   if (!req.body.title) {
//     res.status(400).json({
//       error: "Request body must contain a 'title' property",
//     });
//     return;
//   }
//   if (!req.body.author) {
//     res.status(400).json({
//       error: "Request body must contain a 'author' property",
//     });
//     return;
//   }

//   next();
// }

// router.get("/resources", (req, res) => {
router.get("/", (req, res) => {
  // const { genre, isRead } = req.query;
  // let query = {};
  // if (genre) {
  //   query.genre = genre;
  // }
  // if (isRead) {
  //   query.isRead = isRead;
  // }

  // _.pick(req.body, "genre", "isRead")
  console.log(req.query);
  Book.find(req.query)
    .limit(5)
    .sort("-createdAt")

    // .populate("author") // TODO: If bored
    .then((resources) => {
      res.send(resources);
    })
    .catch(() => {
      res.status(500);
      res.json({
        error: "Something went wrong, please try again later",
      });
    });
});

// router.post("/resources",  (req, res) => {
router.post("/", (req, res) => {
  Book.create(_.pick(req.body, "title", "author", "genre", "isRead"))
    .then((newResource) => {
      res.status(201).send(newResource);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(400).json(error);
      } else {
        res.status(500).json(error);
      }
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    //.populate("author") // TODO: If bored
    .then((book) => {
      if (!book) {
        res.status(404).end();
        return;
      }
      res.send(book);
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong, please try again later",
      });
    });
});

router.patch("/:id", (req, res) => {
  console.log("yohooo  - patch!");
  const { id } = req.params;

  // db.updateById(id, req.body)
  // Book.updateOne({ _id: id }, req.body)
  Book.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedResource) => {
      if (!updatedResource) {
        res.status(404).end();
        return;
      }
      res.send(updatedResource);
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong, please try again later",
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // db.deleteById(id)
  Book.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(500).json({
        error: "Something went wrong, please try again later",
      });
    });
});

module.exports = router;
