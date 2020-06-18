const express = require("express");
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(() => {
      res.status(500).json({
        message: "Could not retrieve the list of accounts",
      });
    });

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    db("accounts")
      .where({ id })
      .first()
      .then((account) => {
        if (account) {
          res.status(200).json(account);
        } else {
          res.status(404).json({
            message: "Account can not be found",
          });
        }
      });
  });

  router.post("/", (req, res) => {
    if (accountIsValid(req.body)) {
      db("accounts")
        .insert(req.body, "id")
        .then(([id]) => id)
        .then((id) => {
          db("accounts")
            .where({ id })
            .first()
            .then((account) => {
              res.status(201).json(account);
            });
        })
        .catch(() => {
          res.status(500).json({
            message: "Could not add the account",
          });
        });
    } else {
      res.status(400).json({
        message: "Please provide name and budget",
      });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const accounts = await db("accounts").where("id", id).update(req.body);
      res.status(200).json(accounts);
    } catch (err) {
      res.status(404).json({ message: "failed to find id" });
    }
  });

  router.delete("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .del()
      .then((count) => {
        res.status(200).json({ message: `${count} record(s) deleted` });
      })
      .catch(() => {
        res.status(500).json({ message: "Could not remove the account" });
      });
  });
});
