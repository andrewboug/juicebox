const express = require("express");
const tagsRouter = express.Router();
const { getPostsByTagName, getAllTags } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("a  request is being made to /tags");
  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;

  try {
    const posts = await getPostsByTagName(tagName);

    if (posts) {
      res.send({ posts: posts });
    } else {
      next({
        name: "Error",
        message: "No posts matching that tagName",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
