"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var vm2_1 = require("vm2");
var path_1 = __importDefault(require("path"));
var function_list_1 = require("./function-list");
//import start from "./hello.import";
function askQuestion(questionData) {
    var moduleName = "com.cat.image";
    var startFile = "index";
    var moduleId = "5e6387b4b1424bd7c0d92aeb";
    return new Promise(function (resolve, reject) {
        var vm = new vm2_1.NodeVM({
            //console: "inherit",
            sandbox: {
                resolveResponse: function (result) {
                    console.log(typeof result);
                    result = typeof result == "string" ? JSON.parse(result) : result;
                    resolve(result);
                },
                rejectResponse: function (error) {
                    console.log(error);
                    reject(error);
                },
                getQuestion: function () { return questionData; },
                getModulePath: function () {
                    var modulePath = path_1["default"].join(__dirname, "..", "..", "modules", moduleName, startFile);
                    return modulePath;
                },
                getFunctions: function () {
                    var func = {
                        getModuleDirectory: function (cb) { return function_list_1.getModuleDirectory(moduleId, cb); },
                        getModuleVariables: function (cb) { return function_list_1.getModuleVariables(moduleId, cb); }
                    };
                    return func;
                }
            },
            require: {
                external: true
            }
        });
        //
        try {
            vm.run("let start= require(getModulePath())\n         let boom = require('boom')\n\n        try{\n          start({question: getQuestion(),\n            func:getFunctions()\n          })\n          .then((result)=>{console.log(result);\n          resolveResponse(result)})\n          .catch((e)=>{\n            console.log(e)\n            let error = new Error(e);\n            let outputError = boom.boomify(error, { statusCode: 500 }).output;\n            rejectResponse(outputError)})\n        }\n        catch(e){\n          console.log(e)\n          let error = new Error(e);\n          let outputError = boom.boomify(error, { statusCode: 500 }).output;\n          rejectResponse(outputError)\n        }\n      ", "vm.js");
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
        /*let vm = new isolateVM.Isolate({ memoryLimit: 128 });
        let context = vm.createContextSync();
        //modules must export its init function from its start scripts and its must return a Promise
        let module = `import module from '../../module/String/helloworld'`;
        //let module = `import module from 'C:/Users/Personal Work/Documents/React-Projects/virtual-orchestration/server/dist/modules/String/helloworld.js'`;
        //let module = `import module from './hello.import'`;
        vm.compileModule(module)
          .then(result => {
            console.log(result.dependencySpecifiers);
    
            //console.log(result.namespace);
            result.instantiateSync(context, (specifier, referrer) => {
              return result;
            });
            //run module and time-out in 10 seconds
            result
              .evaluate({ timeout: 10000 })
              .then(result => {
                //return result to client
                resolve(result);
              })
              .catch(err => {
                console.log(err);
                let error = new Error(err);
                let outputError = boom.boomify(error, { statusCode: 500 }).output;
                reject(outputError);
              });
          })
          .catch(err => {
            console.log(err);
            let error = new Error(err);
            let outputError = boom.boomify(error, { statusCode: 500 }).output;
            reject(outputError);
          });*/
    });
}
exports.askQuestion = askQuestion;
//# sourceMappingURL=vo.client.controller.js.map