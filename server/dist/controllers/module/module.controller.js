"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var unzipper_1 = __importDefault(require("unzipper"));
var yauzl_1 = __importDefault(require("yauzl"));
var module_create_1 = __importDefault(require("../../database/mongoose/crud/module.create"));
var module_schema_1 = __importDefault(require("../../database/mongoose/schema/module.schema"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var boom_1 = __importDefault(require("boom"));
var ncp_1 = __importDefault(require("ncp"));
function listModule() { }
exports.listModule = listModule;
function deleteModule() { }
exports.deleteModule = deleteModule;
//method for installing module
function installModule(filePath, fileName) {
    console.log("Zip path", path_1["default"].join(filePath, fileName));
    var fileExist = false;
    return new Promise(function (resolve, reject) {
        yauzl_1["default"].open(path_1["default"].join(filePath, fileName), { lazyEntries: true }, function (err, zipfile) {
            if (err) {
                var error = new Error(err.message);
                reject(boom_1["default"].boomify(error, { statusCode: 400 }).output);
                return;
            }
            //read zip entry
            zipfile.readEntry();
            zipfile.on("entry", function (entry) {
                if (/\/$/.test(entry.fileName)) {
                    console.log("Folder");
                    // Directory file names end with '/'.
                    // Note that entires for directories themselves are optional.
                    // An entry's fileName implicitly requires its parent directories to exist.
                    zipfile.readEntry();
                }
                else {
                    if (/(appconfig\.json)/.test(entry.fileName)) {
                        console.log("File Exist");
                        fileExist = true;
                        zipfile.readEntry();
                    }
                    else {
                        zipfile.readEntry();
                    }
                    console.log("File Does not Exist");
                }
            });
            zipfile.on("error", function (err) {
                reject(err);
            });
            zipfile.on("close", function () {
                //check if appconfig file exist
                if (fileExist) {
                    fs_1["default"].createReadStream(path_1["default"].join(filePath, fileName)).pipe(unzipper_1["default"]
                        .Extract({
                        path: path_1["default"].join(filePath, fileName.replace(".zip", ""))
                    })
                        .on("close", function () {
                        //finished extracting files
                        //verify that the appconfig file is valid
                        verifyAppConfig(reject, resolve, filePath, fileName.replace(".zip", ""));
                        //resolve({ message: "Successfully installed module" });
                    })
                        .on("error", function (err) {
                        var error = new Error(err.message);
                        reject(boom_1["default"].boomify(error, { statusCode: 400 }).output);
                    }));
                }
                else {
                    //report error if appconfig doesnt exist
                    var error = new Error("appconfig.json file does not exist at the root folder/zip");
                    reject(boom_1["default"].boomify(error, { statusCode: 400 }).output);
                }
            });
        });
    });
    /*  createModule({})
      .then(result => {
        //res.send(result);
      })
      .catch(error => {
        //res.status(500).send(error);
      });*/
}
exports.installModule = installModule;
function verifyAppConfig(reject, resolve, filePath, folderName) {
    //read the appconfig file
    fs_1["default"].readFile(path_1["default"].join(filePath, folderName, "appconfig.json"), "utf8", function (err, data) {
        if (err) {
            console.log(err);
            var error = new Error(err.message);
            reject(boom_1["default"].boomify(error, { statusCode: 400 }).output);
            return;
        }
        try {
            var appconfig_1 = JSON.parse(data);
            var validateStrategy = new module_schema_1["default"](appconfig_1);
            validateStrategy.validate(function (err) {
                if (err) {
                    var error = new Error("The appconfig.json file has an invalid scheme. Make sure the Schema is correct\n            " + err.message);
                    reject(boom_1["default"].boomify(error, { statusCode: 400 }).output);
                }
                else {
                    //remove unwanted data that you dont want populated i.e rating and usefulness
                    delete appconfig_1.usefulness;
                    delete appconfig_1.rating;
                    //add schema to plugin collection
                    module_create_1["default"](appconfig_1)
                        .then(function (result) {
                        //copy file to module folder
                        ncp_1["default"](path_1["default"].join(filePath, folderName), path_1["default"].join(__dirname, "..", "..", "modules", appconfig_1.packageName), function (err) {
                            if (err) {
                                console.error(err);
                                var error = new Error("Error installing module");
                                reject(boom_1["default"].boomify(error, { statusCode: 500 }).output);
                            }
                            resolve({ message: "Module installed successfully" });
                        });
                    })["catch"](function (error) {
                        reject(error);
                    });
                }
            });
        }
        catch (e) {
            var error = new Error("appconfig.json file is not a valid json");
            reject(boom_1["default"].boomify(error, { statusCode: 400 }).output);
        }
    });
}
//# sourceMappingURL=module.controller.js.map