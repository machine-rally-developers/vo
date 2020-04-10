import moduleSchema from "../schema/module.schema";
import mongoose from "mongoose";
import boom from "boom";

export default function DeleteModule(
  variableId: string,
  moduleId: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    moduleSchema.findByIdAndUpdate(
      moduleId,
      {
        $pull: {
          variables: {
            _id: variableId
          }
        }
      },
      function(err, doc) {
        if (err) {
          reject(err.message);
        } else {
          resolve(doc);
        }
      }
    );
  });
}
