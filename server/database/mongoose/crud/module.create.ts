import moduleSchema from "../schema/module.schema";
import boom from "boom";
interface ModuleDataType {
  description: String;
  licence: String;
  authors: Array<String>;
  email: String;
  summary: String;
  name: String;
  packageName: String;
  tags?: Array<String>;
  triggers: Array<String>;
  variables: Array<String>;
}

export default function createModule(moduleData: ModuleDataType): Promise<any> {
  let saveModule = new moduleSchema(moduleData);

  return new Promise((resolve, reject) => {
    saveModule
      .save()
      .then(result => {
        resolve({ message: "Successfully created database entry for module" });
      })
      .catch(error => {
        let err = new Error(error.message);
        reject(boom.boomify(err, { statusCode: 400 }).output);
      });
  });
}
