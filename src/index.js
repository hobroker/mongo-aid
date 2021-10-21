import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { rmdir } from "fs";
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
import mongodump from "./mongo/mongodump.js";
import getBucket from "./gcs/getBucket.js";
import upload from "./gcs/upload.js";
import deleteOldFolders from "./gcs/deleteOldFolders.js";

dotenv.config();

const mongodumpOptions = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  database: process.env.MONGO_DATABASE,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
};

const gcsOptions = {
  keyFilename: process.env.GCS_KEYPATH,
  bucketName: process.env.GCS_BUCKET,
  keepCount: process.env.GCS_KEEP_COUNT || 4,
};

(async () => {
  const {directoryPath} = await mongodump({
    ...mongodumpOptions,
    directory: join(dirname(fileURLToPath(import.meta.url)), "../backups"),
  });

  const storage = new Storage({
    keyFilename: gcsOptions.keyFilename,
  });

  const bucket = await getBucket(gcsOptions.bucketName, storage);

  await upload(directoryPath, bucket);
  await deleteOldFolders(gcsOptions.keepCount, bucket);
  await new Promise(resolve => rmdir(directoryPath, {recursive: true}, resolve));
})();
