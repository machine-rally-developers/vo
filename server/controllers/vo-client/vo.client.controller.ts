//import isolateVM from "isolated-vm";
import boom from "boom";
import { NodeVM } from "vm2";
//import start from "./hello.import";
function askQuestion(questionData): Promise<any> {
  return new Promise((resolve, reject) => {
    const vm = new NodeVM({
      //console: "inherit",
      sandbox: {
        resolveResponse: result => {
          resolve(result);
        },
        rejectResponse: error => {
          reject(error);
        }
      },
      require: {
        external: true
      }
    });
    let moduleName: string = "String";
    let startFile: string = "helloworld";
    //console.log(process.cwd());
    try {
      vm.run(
        `let start= require('./dist/modules/${moduleName}/${startFile}')
         let boom = require('boom')

        try{
          start(${JSON.stringify(questionData)})
          .then((result)=>{console.log(result);
          resolveResponse(result)})
          .catch((e)=>{
            let error = new Error(e);
            let outputError = boom.boomify(error, { statusCode: 500 }).output;
            rejectResponse(outputError)})
        }
        catch(e){

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
