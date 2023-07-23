const { File, validate } = require("../models/file");
const fs = require("fs");
const readline = require("readline");

const spellCheck = (path) => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    console: false,
  });

  readInterface.on("line", function (line) {
    console.log(line);
  });
};

// defined as the base for the links of all the uploaded items on the server
const BASE_URL = process.env.API_URL  || "http://0.0.0.0:4000";

exports.upload = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, description } = req.body; // The name and description are extracted from the body after validation.
    let path = req.file.path;

    const file = await File.create({
      name,
      createdBy: req.user.user_id, // The createdBy value is the authenticated creator of the uploaded file.
      description,
      createdAt: Date.now(), // The createdAt value shows the time when the file was uploaded to the server.
      filePath: process.env.API_URL + "/" + path, // contains the public URL for that item on the server so that we can access it easily.
    });

    res.status(200).json({ message: "File uploaded successfully", data: file });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};