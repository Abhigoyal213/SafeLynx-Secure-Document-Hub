const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith('image/');
    const nameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");
    const timestamp = Date.now();
    const uniqueName = `${nameWithoutExt}_${timestamp}`;

    if (isImage) {
      return {
        folder: "safelynx",
        resource_type: "image",
        public_id: uniqueName,
      };
    } else {
      return {
        folder: "safelynx",
        resource_type: "raw",
        public_id: uniqueName + path.extname(file.originalname), // Explicit extension for Raw files
        use_filename: true,
        unique_filename: false
      };
    }
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "text/plain",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter,
});

module.exports = upload;
