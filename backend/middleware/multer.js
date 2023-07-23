const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => { // specifies the base directory that stores the uploaded items.
    cb(null, "uploads");
  },
  filename: (req, file, cb) => { // specifies how Multer should store the uploaded items.
    const ext = file.mimetype.split("/")[1]; // specifies the file extension that is used to rename the file safely
    cb(null, `item-${file.fieldname}-${Date.now()}.${ext}`); // Date.now() is used to make sure that the file name will always be unique
  },
});

exports.upload = multer({ storage });
