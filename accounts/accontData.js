const express = require("express");
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("accounts")
    .from("accounts")
    .then(accounts => {});
});
