const express = require("express")
const app = express()
const port = 3001;

app.get("/", (req, res) => {
    res.send({message: "Hellow world!"})
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}!`)
});