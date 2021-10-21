import path from "path";
import { listFiles } from "../util/index.js";

/**
 * @param {string} directory
 * @param {Bucket} bucket
 * @returns {Promise<[]>}
 */
const upload = async (directory, bucket) => {
  const fileList = await listFiles(directory);
  const pathDirName = path.dirname(directory);

  const response = await Promise.all(
    fileList.map(filePath => {
      const destination = path.relative(pathDirName, filePath);

      return bucket
        .upload(filePath, {destination})
        .then(
          () => ({destination}),
          error => ({destination, error}),
        );
    }),
  );

  response.forEach(({error, destination}) => {
    if (error) {
      throw new Error("upload fail");
    }
    console.log("uploaded", destination);
  });

  return response;
};

export default upload;
