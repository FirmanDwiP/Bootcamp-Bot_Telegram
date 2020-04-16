const express = require('express')
const router = express.Router()

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

module.exports = router
