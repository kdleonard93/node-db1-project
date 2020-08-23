const express = require('express');
const accountData = require("../accounts/accountData")
const db = require('../data/dbConfig.js');

const server = express();

server.use(express.json());

server.use("/accounts", accountData);

module.exports = server;