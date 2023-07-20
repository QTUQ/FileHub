const mongoose = require("mongoose");

const {MONGO_URL} = process.env

exports.connect = () => {
    mongoose
    .connect(MONGO_URL, {useNewUrlParser: true})
    .then(() => {
        console.log("connected to database successfully...");
    })
    .catch((error) => {
        console.log("failed to connect to the database. terminating the application..");
        console.log(error);
        process.exit(1);
    });
};