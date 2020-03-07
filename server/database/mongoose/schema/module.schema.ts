import mongoose from "mongoose";

const Schema = mongoose.Schema;
//schema for variables neeeded
const variableSchema = new Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
});
//schema for modules
const moduleSchema = new Schema({
  description: { type: String, required: true },
  startFile: { type: String, required: true },
  licence: { type: String, required: true },
  authors: { type: [], required: true },
  email: { type: String, required: true },
  summary: { type: String, required: true, maxlength: 150 },
  name: { type: String, required: true, unique: true },
  packageName: { type: String, required: true, unique: true },
  tags: { type: [] },
  triggers: { type: [], required: true },
  variables: { type: [variableSchema] },
  rating: { type: [] },
  usefulness: { type: [] }
});

export default mongoose.model("module", moduleSchema);
