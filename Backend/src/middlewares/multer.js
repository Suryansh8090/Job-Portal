import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({storage}).single("file")
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "resume" && file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed for resumes."), false);
    }
    if (
      file.fieldname === "profilePhoto" &&
      !file.mimetype.startsWith("image/")
    ) {
      return cb(
        new Error("Only image files are allowed for profile photos."),
        false
      );
    }
    cb(null, true);
  },
});

export const uploadFields = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);


// Middleware for handling errors
export const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
      res.status(400).send(`Multer error: ${err.message}`);
  } else if (err) {
      res.status(400).send(err.message);
  } else {
      next();
  }
};