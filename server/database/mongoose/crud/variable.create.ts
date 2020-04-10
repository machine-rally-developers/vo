import moduleSchema from "../schema/module.schema";
import boom from "boom";
interface Variables {
  key: string;
  value: string;
}

export default function createVariable(
  variables: Variables,
  id: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    moduleSchema.findByIdAndUpdate(id, { $push: { variables } }, function(
      err,
      doc
    ) {
      if (err) {
        reject(err.message);
      } else {
        resolve(doc);
      }
    });
  });
}
