"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var module_schema_1 = __importDefault(require("../schema/module.schema"));
function createVariable(variables, id) {
    return new Promise(function (resolve, reject) {
        module_schema_1["default"].findByIdAndUpdate(id, { $push: { variables: variables } }, function (err, doc) {
            if (err) {
                reject(err.message);
            }
            else {
                resolve(doc);
            }
        });
    });
}
exports["default"] = createVariable;
//# sourceMappingURL=variable.create.js.map