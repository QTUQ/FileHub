require("dotenv").config();
require("./database/database.js").connect();
const express = require("express")
const router = require("./routes/index");
const app = express()
const port = process.env.PORT || 3001;

app.use(express.json()); 

app.get("/", (req, res) => {
    res.send({message: "Hellow world!"})
})

// Register the application main router
app.use("/api", router);

app.listen(port, () => {
    console.log(`App is listening on port ${port}!`)
});