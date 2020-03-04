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

  router.get("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .first()
      .then(account => {
        if (account) {
          res.status(200).json(account);
        } else {
          res.status(404).json({
            message: "Account can not be found"
          });
        }
      });
  });
});
