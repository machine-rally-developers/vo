import React from "react";
import Home from "../home/index";
export const routes = [
  {
    path: "",
    component: function() {
      return Home;
    }
  }
];

export default {
  routes
};
