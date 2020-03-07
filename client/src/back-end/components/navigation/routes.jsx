/**
 * File creates routes of the backend
 */
import React from "react";
import Modules from "../modules/app-modules/index";
import KeyValueManager from "../key-value-manager/index";
import Home from "../home/index";
import InstallModules from "../modules/install-modules/index";
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
  },
  {
    path: "modules/list-modules",
    component: function() {
      return Modules;
    }
  },
  {
    path: "modules/install-modules",
    component: function() {
      return InstallModules;
    }
  }
];

export default {
  routes
};
