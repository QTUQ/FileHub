require("dotenv").config();
require("./database/database.js").connect();
const express = require("express")
const app = express()
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send({message: "Hellow world!"})
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}!`)
});