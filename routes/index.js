var express = require("express");
const { upload } = require("../services/fileUpload");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Audio File Uploader" });
});

router.post("/submit", upload.single("audio"), (req, res, next) => {
  try {
    const link = `http://${req.headers.host}/audio/${req.file.filename}`;
    res.render("submitted", {
      head: "Uploaded",
      link: link,
      fileName: req.file.filename,
    });
  } catch (error) {
    res.render("error", { message: "Something went wrong" });
  }
});

module.exports = router;
