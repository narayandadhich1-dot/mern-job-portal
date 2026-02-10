import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataUriParser();

  // FIX: multer uses "originalname", not "originalName"
  const extName = path.extname(file.originalname).toString();

  return parser.format(extName, file.buffer);
};

export default getDataUri;
