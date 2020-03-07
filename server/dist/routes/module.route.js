"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express")); //package for running server. Used in tis file to create routes
var multer_1 = __importDefault(require("multer")); //This is for receiving file upload to the server
var boom_1 = __importDefault(require("boom")); //for creating error response
var path_1 = __importDefault(require("path"));
var module_controller_1 = require("../controllers/module/module.controller");
var randomstring_1 = __importDefault(require("randomstring"));
//temp module filePath
var tempModulePath = path_1["default"].join(__dirname, "..", "temp");
// final destination of the zip file
var definitePath;
//file name of the uploaded file
var fileName;
//create multer storage callback. This will be insert in the multer initialisation
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempModulePath);
    },
    filename: function (req, file, cb) {
        //generated random string
        //destination of the zip file
        definitePath = randomstring_1["default"].generate();
        fileName = definitePath + ".zip";
        cb(null, fileName);
    }
});
//zip upload handler
var moduleUpload = multer_1["default"]({ storage: storage });
var moduleRouter = express_1["default"].Router();
moduleRouter
    .route("/modules")
    .get(function (req, res) { })
    .post(moduleUpload.single("module"), checkFileExists, function (req, res) {
    //moduleUpload(req, res, err => {
    //check that there is a file
    if (!req.file) {
        //create error message
        var error = new Error("Error uploading  zip file. Zip may be corrupted");
        //boomify error message
        var responseMessage = boom_1["default"].boomify(error, { statusCode: 400 }).output;
        //send error message to client
        res.status(responseMessage.statusCode).json(responseMessage);
        return;
    }
    //install module
    module_controller_1.installModule(tempModulePath, fileName)
        .then(function (result) {
        res.json(result);
    })["catch"](function (error) {
        console.log(error);
        res.status(error.statusCode).json(error);
    });
    //});
})["delete"](function (req, res) { });
//check if file exists in the payload
function checkFileExists(req, res, next) {
    if (!req.file) {
        //create error message
        var error = new Error("Error occured. Not a zip file");
        //boomify error message
        var responseMessage = boom_1["default"].boomify(error, { statusCode: 400 }).output;
        //send error message to client
        res.status(responseMessage.statusCode).json(responseMessage);
        return;
    }
    next();
}
exports["default"] = moduleRouter;
//# sourceMappingURL=module.route.js.map