import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import {
  S3_ACCESS_KEY_ID,
  S3_REGION,
  S3_SECRET_ACCESS_KEY,
  S3_BUCKET
} from "../constants/aws.constant";

const s3 = new S3Client({
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY
  },
  region: S3_REGION
});

const imgUpload = multer({
  storage: multerS3({
    s3,
    bucket: S3_BUCKET,
    key(req, file, cb) {
      cb(null, `petsitter/${Date.now()}_${file.originalname}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

export default imgUpload;
