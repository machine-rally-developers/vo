import React from "react";
import Modules from "../modules/index";
import KeyValueManager from "../key-value-manager/index";
import Home from "../home/index";
export const routes = [
  {
    path: "",
    component: function() {
      return Home;
    }
  },
  {
    path: "key-value-manager",
    component: function() {
      return KeyValueManager;
    }
  },
  {
    path: "modules",
    component: function() {
      return Modules;
    }
  }
];

export default {
  routes
};
