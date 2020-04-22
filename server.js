const express = require("express");
const accountData = require("./accounts/accountData");

const server = express();

server.use(express.json());
server.use("/api/accounts", accountData);

server.get("/", (req, res) => {
  return res.send("<h2>check</h2>");
});

server.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ message: "Something is wrong" });
});

module.exports = server;
