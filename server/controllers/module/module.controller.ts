import unzipper from "unzipper";
import yauzl from "yauzl";
import createModule from "../../database/mongoose/crud/module.create";
import moduleSchema from "../../database/mongoose/schema/module.schema";
import fs from "fs";
import path from "path";
import boom from "boom";
import ncp from "ncp";
function listModule() {}
function deleteModule() {}
//method for installing module
function installModule(filePath: string, fileName: string): Promise<any> {
  console.log("Zip path", path.join(filePath, fileName));
  let fileExist: boolean = false;
  return new Promise((resolve, reject) => {
    yauzl.open(
      path.join(filePath, fileName),
      { lazyEntries: true },
      (err, zipfile) => {
        if (err) {
          let error = new Error(err.message);
          reject(boom.boomify(error, { statusCode: 400 }).output);
          return;
        }
        //read zip entry
        zipfile.readEntry();
        zipfile.on("entry", function(entry) {
          if (/\/$/.test(entry.fileName)) {
            console.log("Folder");
            // Directory file names end with '/'.
            // Note that entires for directories themselves are optional.
            // An entry's fileName implicitly requires its parent directories to exist.
            zipfile.readEntry();
          } else {
            if (/(appconfig\.json)/.test(entry.fileName)) {
              console.log("File Exist");
              fileExist = true;
              zipfile.readEntry();
            } else {
              zipfile.readEntry();
            }
            console.log("File Does not Exist");
          }
        });
        zipfile.on("error", err => {
          reject(err);
        });
        zipfile.on("close", () => {
          //check if appconfig file exist
          if (fileExist) {
            fs.createReadStream(path.join(filePath, fileName)).pipe(
              unzipper
                .Extract({
                  path: path.join(filePath, fileName.replace(".zip", ""))
                })
                .on("close", () => {
                  //finished extracting files
                  //verify that the appconfig file is valid
                  verifyAppConfig(
                    reject,
                    resolve,
                    filePath,
                    fileName.replace(".zip", "")
                  );
                  //resolve({ message: "Successfully installed module" });
                })
                .on("error", err => {
                  let error = new Error(err.message);
                  reject(boom.boomify(error, { statusCode: 400 }).output);
                })
            );
          } else {
            //report error if appconfig doesnt exist
            let error = new Error(
              "appconfig.json file does not exist at the root folder/zip"
            );
            reject(boom.boomify(error, { statusCode: 400 }).output);
          }
        });
      }
    );
  });
  /*  createModule({})
    .then(result => {
      //res.send(result);
    })
    .catch(error => {
      //res.status(500).send(error);
    });*/
}
function verifyAppConfig(
  reject: any,
  resolve: any,
  filePath: string,
  folderName: string
) {
  //read the appconfig file
  fs.readFile(
    path.join(filePath, folderName, "appconfig.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.log(err);
        let error = new Error(err.message);
        reject(boom.boomify(error, { statusCode: 400 }).output);
        return;
      }
      try {
        let appconfig = JSON.parse(data);

        let validateStrategy = new moduleSchema(appconfig);
        validateStrategy.validate(function(err) {
          if (err) {
            let error = new Error(`The appconfig.json file has an invalid scheme. Make sure the Schema is correct
            ${err.message}`);
            reject(boom.boomify(error, { statusCode: 400 }).output);
          } else {
            //remove unwanted data that you dont want populated i.e rating and usefulness
            delete appconfig.usefulness;
            delete appconfig.rating;
            //add schema to plugin collection
            createModule(appconfig)
              .then(result => {
                //copy file to module folder
                ncp(
                  path.join(filePath, folderName),
                  path.join(
                    __dirname,
                    "..",
                    "..",
                    "modules",
                    appconfig.packageName
                  ),
                  function(err) {
                    if (err) {
                      console.error(err);
                      let error = new Error(`Error installing module`);
                      reject(boom.boomify(error, { statusCode: 500 }).output);
                    }
                    resolve({ message: "Module installed successfully" });
                  }
                );
              })
              .catch(error => {
                reject(error);
              });
          }
        });
      } catch (e) {
        let error = new Error("appconfig.json file is not a valid json");
        reject(boom.boomify(error, { statusCode: 400 }).output);
      }
    }
  );
}
export { installModule, listModule, deleteModule };
