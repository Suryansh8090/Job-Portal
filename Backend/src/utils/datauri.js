import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

const getDataUri = (file) => {
  try {
    const extName = path.extname(file.originalname).toString(); // Extract the file extension
    if (!extName) {
      throw new Error("File does not have a valid extension");
    }
  //  console.log("File extension:", extName);
    return parser.format(extName, file.buffer); // Convert buffer to Data URI
  } catch (error) {
    console.error("Error generating Data URI:", error);
    throw error; // Rethrow error if any
  }
};

export default getDataUri;
