const express = require("express");
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
  //   res.send({ message: "hello from /users! from Andrew & vanessa !" });
});

const { getAllUsers } = require("../db");

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users,
  });
});

module.exports = usersRouter;
