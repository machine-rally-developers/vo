import express from "express"; //package for running server. Used in tis file to create routes
import boom from "boom"; //for creating error response
import path from "path";
import { askQuestion } from "../controllers/vo-client/vo.client.controller";

let voClientRouter = express.Router();
voClientRouter
  .route("/question")

  .post((req, res) => {
    if (!req.body.question) {
      let error = new Error("Please enter a question");
      let boomifyError = boom.boomify(error, { statusCode: 400 }).output;
      res.status(boomifyError.statusCode).json(boomifyError);
      return;
    }
    askQuestion(req.body)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(error.statusCode).json(error);
      });
  });

export default voClientRouter;
