"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
//schema for variables neeeded
var variableSchema = new Schema({
    key: { type: String, required: true },
    value: { type: String, required: true }
});
//schema for modules
var moduleSchema = new Schema({
    description: { type: String, required: true, unique: true },
    startFile: { type: String, required: true },
    licence: { type: String, required: true, unique: true },
    authors: { type: [], required: true },
    email: { type: String, required: true },
    summary: { type: String, required: true, unique: true, maxlength: 150 },
    name: { type: String, required: true, unique: true },
    packageName: { type: String, required: true, unique: true },
    tags: { type: [] },
    triggers: { type: [], required: true },
    variables: { type: [variableSchema] },
    rating: { type: [] },
    usefulness: { type: [] }
});
exports["default"] = mongoose_1["default"].model("module", moduleSchema);
//# sourceMappingURL=module.schema.js.map