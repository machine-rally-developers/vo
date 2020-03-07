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

export default function ListModule(data: object): Promise<ModuleDataType> {
  return new Promise((resolve, reject) => {
    moduleSchema.find(data, (err, res: ModuleDataType) => {
      if (err) {
        let error = new Error(err.message);
        reject(boom.boomify(error, { statusCode: 400 }).output);
      } else {
        resolve(res);
      }
    });
  });
}
