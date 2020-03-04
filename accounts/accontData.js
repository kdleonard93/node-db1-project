const express = require("express");
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(() => {
      res.status(500).json({
        message: "Could not retrieve the list of accounts"
      });
    });

  router.get("/", (req, res) => {});
});
