import multer from "multer";

const imgUpload = multer({ dest: "uploads/" });

export default imgUpload;
