const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Listening on port " + PORT));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/post", (req, res) => {

})