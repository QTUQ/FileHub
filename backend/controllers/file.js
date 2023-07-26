const { File, validate } = require("../models/file");
const fs = require("fs");
const readline = require("readline");
const SpellChecker = require("simple-spellchecker").getDictionarySync("en-GB");
const stringSimilarity = require("string-similarity");
const sharp = require("sharp");

// defined as the base for the links of all the uploaded items on the server
const BASE_URL = process.env.API_URL 

// craete operation
// process text file
const spellCheck = async (path) => {
  console.log("spellCheck")
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    console: false,
  });

  let text = "";

  for await (const line of readInterface) {
    const correctedLine = line
      .split(" ")
      .map((word) => {
        if (!SpellChecker.spellCheck(word)) {
          const suggestions = SpellChecker.getSuggestions(word);

          const matches = stringSimilarity.findBestMatch(
            word,
            suggestions.length === 0 ? [word] : suggestions
          );

          return matches.bestMatch.target;
        }
        return word;
      })
      .join(" ");

    text += correctedLine + "\n";
  }

  fs.writeFile(`${path}.txt`, text, (err, res) => {
    if (err) console.log("error", err);
  });
};

// process image file 
const processImage = async (path) => { // async-await feature because the metadata() method is an async function
  try {
    const imgInstnace = sharp(path);
    const metadata = await imgInstnace.metadata(); 
    console.log(metadata);  // to obtain information about the image
    const newPath = path.split(".")[0] + "-img.jpeg";
    imgInstnace
      .resize({ // resize all images to a fixed size so that they are symmetrical when we displayed in the UI.
        //  resize the image with a width of 350 pixels and set the fit attribute to contain to keep the scale
        width: 350,
        fit: sharp.fit.contain,
      })
      .toFormat("jpeg", { mozjpeg: true }) // We compress the image to achieve better performance in the frontend
      .blur(1) // The sigma argument accepts values between 0.3 and 1000.
      .composite([{ input: "uploads/logo.png", gravity: "center" }]) // to indicate that the uploaded images belong to our application only.
      .toFile(newPath);

    return newPath;
  } catch (error) {
    console.log(
      `An error occurred during processing the uploaded image: ${error}`
    );
  }

  return path;
};

exports.upload = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, description } = req.body; // The name and description are extracted from the body after validation.
    let path = req.file.path;

    if (req.file.mimetype === "text/plain") {
      await spellCheck(req.file.path);
      path = `${req.file.path}.txt`;
    }

    if (req.file.mimetype.match(/^image/)) { //  /^image/ expression to match all the images when calling the function
      path = await processImage(req.file.path); // define a new path for the image, because we cannot write and read the same image in the sharp package.
      
    }

    const file = await File.create({
      name,
      createdBy: req.user.user_id, // The createdBy value is the authenticated creator of the uploaded file.
      description,
      createdAt: Date.now(), // The createdAt value shows the time when the file was uploaded to the server.
      filePath: BASE_URL + "/" + path, // contains the public URL for that item on the server so that we can access it easily.
    });

    console.log(filePath);
    console.log(createdBy);


    res.status(200).json({ message: "File uploaded successfully", data: file });
  } catch (err) {
    console.log(err);
    console.log("Faild...")
    return res.status(400).send(err.message);
  }
};

// Read, update, delete operations

exports.getAll = async (req, res) => {
  try {
    // The createdBy parameter is a query parameter used to retrieve the files related to a particular user.
    const { createdBy } = req.params;

    const allFiles = await File.find({createdBy: createdBy});
    res 
    .status(200)
    console.log("File retrived successfully")
    .json({message: "File retrived successfully", data: allFiles});
  } catch (err) {
    console.log(error);
    return res.status(500).send(err.message);
  }
}

exports.getFile = async (req, res) => {
  try {
    const { createdBy, fileId } = req.params;

    const files = await File.findOne({ _id: fileId, createdBy: createdBy });

    if (!files) {
      return res.status(404).send("The requested file does not exist");
    }

    res 
    .status(200)
    .json({message: "File retrieved successfully", data: file})
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

// search file 

exports.searchFile = async (req, res) => {
  try {
    const filter = {};

    if (req.query.name) filter.name = /req.query.name/;
    if (req.query.description) filter.description = /req.query.description/;
    if (req.query.createdAt) filter.createdAt = req.query.createdAt;

    const files = await File.find(filter);
    
    res
    .status(200)
    .json({message: "Files retrieved successfully", data: files})
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message);
  }
}

// update file

exports.updateFile = async (req, res) => {
  try {
    const { _id } = req.params;
    // The user can only update the name and description of this file document.
    const { name, description } = req.body

    if (!name || description) 
      return res.status(400).send("File's name and description are required");
    const result = await File.validateAsync({ name, description});
    const file = await File.findOne({
      _id,
    });

    if (!file) {
      return res.status(404).send("The requested file doe not exist");
    }

    const updateFile = await File.update(
      {
      _id,
    }, 
    {
      $set: result,
    },
    {
      update: true
    }
    );
    res 
    .status(200)
    .json({message: "File updated successfully", data: updateFile});
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message);
  }
}

// delete file 

exports.deleteFile = async (req, res) => {
  try {

    const { _id } = req.params;
    const file = await File.findOne({
      _id,
    });

    if (!file) {
      return res.status(404).send("The requested file doe not exist");
    }

    await File.removeAllListeners({
      _id,
    });

    res
    .status(200)
    .json({message: "File deleted successfully"});

  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}