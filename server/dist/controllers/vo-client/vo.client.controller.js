"use strict";
exports.__esModule = true;
var vm2_1 = require("vm2");
//import start from "./hello.import";
function askQuestion(questionData) {
    return new Promise(function (resolve, reject) {
        var vm = new vm2_1.NodeVM({
            //console: "inherit",
            sandbox: {
                resolveResponse: function (result) {
                    resolve(result);
                },
                rejectResponse: function (error) {
                    reject(error);
                }
            },
            require: {
                external: true
            }
        });
        var moduleName = "String";
        var startFile = "helloworld";
        //console.log(process.cwd());
        try {
            vm.run("let start= require('./dist/modules/" + moduleName + "/" + startFile + "')\n         let boom = require('boom')\n\n        try{\n          start(" + JSON.stringify(questionData) + ")\n          .then((result)=>{console.log(result);\n          resolveResponse(result)})\n          .catch((e)=>{\n            let error = new Error(e);\n            let outputError = boom.boomify(error, { statusCode: 500 }).output;\n            rejectResponse(outputError)})\n        }\n        catch(e){\n\n          let error = new Error(e);\n          let outputError = boom.boomify(error, { statusCode: 500 }).output;\n          rejectResponse(outputError)\n        }\n      ", "vm.js");
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