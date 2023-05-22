const express = require("express");
const postsRouter = express.Router();
const { requireUser } = require("./utils");
const { getAllPosts } = require("../db");

postsRouter.post("/", requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/);
  const postData = {};

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    const postData = { authorId, title, content };
    const post = await createPost(postData);
    if (post) {
      res.send({ post });
    } else {
      next({
        name: "Error Creating Post",
        message: "There was an error creating post. Please try again.",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }

  // res.send({ message: "under construction" });
});

postsRouter.use((req, res, next) => {
  console.log("a request is being made to /posts");
  next();
});

postsRouter.get("/", async (req, res) => {
  const posts = await getAllPosts();

  res.send({
    posts,
  });
});

module.exports = postsRouter;
