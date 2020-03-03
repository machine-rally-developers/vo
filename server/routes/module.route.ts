import express from "express"; //package for running server. Used in tis file to create routes
import multer from "multer"; //This is for receiving file upload to the server
import boom from "boom"; //for creating error response
import path from "path";
import { installModule } from "../controllers/module/module.controller";
import randomString from "randomstring";
//temp module filePath
let tempModulePath = path.join(__dirname, "..", "temp");
// final destination of the zip file
let definitePath: string;
//file name of the uploaded file
let fileName: string;
//create multer storage callback. This will be insert in the multer initialisation
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempModulePath);
  },
  filename: function(req, file, cb) {
    //generated random string
    //destination of the zip file
    definitePath = randomString.generate();
    fileName = definitePath + ".zip";

    cb(null, fileName);
  }
});
//zip upload handler
let moduleUpload = multer({ storage });
let moduleRouter = express.Router();
moduleRouter
  .route("/modules")
  .get((req, res) => {})
  .post(moduleUpload.single("module"), checkFileExists, (req, res) => {
    //moduleUpload(req, res, err => {
    /*if (!req.file) {
        //create error message
        let error = new Error(
          "Error uploading  zip file. Zip may be corrupted"
        );
        //boomify error message
        let responseMessage = boom.boomify(error, { statusCode: 400 }).output;
        //send error message to client
        res.status(responseMessage.statusCode).json(responseMessage);
        return;
      }*/
    //install module
    installModule(tempModulePath, fileName)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        console.log(error);
        res.status(error.statusCode).json(error);
      });
    //});
  })
  .delete((req, res) => {});

//check if file exists in the payload
function checkFileExists(req: any, res: any, next: any) {
  if (!req.file) {
    //create error message
    let error = new Error("Error occured. Not a zip file");
    //boomify error message
    let responseMessage = boom.boomify(error, { statusCode: 400 }).output;
    //send error message to client
    res.status(responseMessage.statusCode).json(responseMessage);
    return;
  }
  next();
}
export default moduleRouter;
