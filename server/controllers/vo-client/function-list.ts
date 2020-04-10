import moduleSchema from "../../database/mongoose/schema/module.schema";
import path from "path";
//returns string path
const getModuleDirectory = (id, cb) => {
  moduleSchema.findById(id, function(err, doc: any) {
    if (err) {
      return {};
    } else {
      let modulePath = path.join(
        __dirname,
        "..",
        "..",
        "modules",
        doc.packageName
      );
      cb(modulePath);
    }
  });
};
//returns array
const getModuleVariables = (id, cb) => {
  moduleSchema.findById(id, function(err, doc: any) {
    if (err) {
      return {};
    } else {
      cb(doc.variables);
    }
  });
};

export { getModuleDirectory, getModuleVariables };
