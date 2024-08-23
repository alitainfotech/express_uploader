const multer = require("multer");
const fs = require("fs");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const destinationFolder = "public";
      fs.mkdirSync(destinationFolder, { recursive: true });
      cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
      const extension = file.originalname.split(".").pop();
      const isValidFileType = isAllowedFileType(extension.toLowerCase());
      console.log("isValidFileType", isValidFileType);
      if (isValidFileType) {
        cb(null, Date.now() + "aud" + file.originalname);
      } else {
        cb(
          new Error("Invalid file type. Only MP3 files are allowed."),
          "error"
        );
      }
    },
  }),
});

function isAllowedFileType(extension) {
  const allowedFiletypes = ["mp3"];
  return allowedFiletypes.includes(extension);
}

module.exports = {
  upload,
};
