const router = require("express").Router(); // Ge the router instance of Express
const userController = require("../controllers/user"); // Get all exported functions in the user controller
const fileController = require("../controllers/file");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");

// Map the `signup` request to the signup function
router.post("/signup", userController.signup);

router.get("/verify/:confirmationToken", userController.verifyEmail);
router.post("/login", userController.login);
router.post("/upload", auth, upload.single("file"), fileController.upload);
router.get("/file/:createdBy", auth, fileController.getAll);
router.get("/file/:createdBy/:filedId", auth, fileController.getFile);
router.get("/file", auth, fileController.searchFile);
router.put("/file/:_id", auth, fileController.updateFile);
router.delete("/file/:_id", auth, fileController.deleteFile);

module.exports = router;