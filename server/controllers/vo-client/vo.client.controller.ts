//import isolateVM from "isolated-vm";
import boom from "boom";
import { NodeVM } from "vm2";
import fs from "fs";
import path from "path";
import { getModuleDirectory, getModuleVariables } from "./function-list";
//import start from "./hello.import";
function askQuestion(questionData): Promise<any> {
  let moduleName: string = "com.cat.image";
  let startFile: string = "index";
  let moduleId: string = "5e6387b4b1424bd7c0d92aeb";
  return new Promise((resolve, reject) => {
    const vm = new NodeVM({
      //console: "inherit",
      sandbox: {
        resolveResponse: result => {
          console.log(typeof result);
          result = typeof result == "string" ? JSON.parse(result) : result;
          resolve(result);
        },
        rejectResponse: error => {
          console.log(error);
          reject(error);
        },
        getQuestion: () => questionData,
        getModulePath: () => {
          let modulePath = path.join(
            __dirname,
            "..",
            "..",
            "modules",
            moduleName,
            startFile
          );
          return modulePath;
        },
        getFunctions: () => {
          let func = {
            getModuleDirectory: cb => getModuleDirectory(moduleId, cb),
            getModuleVariables: cb => getModuleVariables(moduleId, cb)
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
      vm.run(
        `let start= require(getModulePath())
         let boom = require('boom')

        try{
          start({question: getQuestion(),
            func:getFunctions()
          })
          .then((result)=>{console.log(result);
          resolveResponse(result)})
          .catch((e)=>{
            console.log(e)
            let error = new Error(e);
            let outputError = boom.boomify(error, { statusCode: 500 }).output;
            rejectResponse(outputError)})
        }
        catch(e){
          console.log(e)
          let error = new Error(e);
          let outputError = boom.boomify(error, { statusCode: 500 }).output;
          rejectResponse(outputError)
        }
      `,
        `vm.js`
      );
    } catch (e) {
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
export { askQuestion };
