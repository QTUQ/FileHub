require("dotenv").config();
require("./database/database.js").connect();
const auth = require("./middleware/auth");
const express = require("express")
const router = require("./routes/index");
const bodyParser = require("body-parser");
const app = express()
const port = process.env.PORT || 3001;

app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/uploads', express.static("./uploads"));

app.get("/", (req, res) => {
    res.send({message: "Hellow world!"})
})

// Register the application main router
app.use("/api", router);

app.post("/api/hello", auth, (req, res) => {
     res.status(200).send("Hello 🙌 ");
    });


app.listen(port, () => {
    console.log(`App is listening on port ${port}!`)
});