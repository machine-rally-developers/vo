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

export default function DeleteModule(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    moduleSchema.findByIdAndDelete(id, (err, res) => {
      if (err) {
        let error = new Error(err.message);
        reject(boom.boomify(error, { statusCode: 400 }).output);
      } else {
        resolve(res);
      }
    });
  });
}
