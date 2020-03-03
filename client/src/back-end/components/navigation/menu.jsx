import React from "react";
import Home from "@material-ui/icons/Home";
import KVM from "@material-ui/icons/VpnKey";
import Module from "@material-ui/icons/ViewModule";
import ListModule from "@material-ui/icons/List";
import InstallModule from "@material-ui/icons/GetApp";
import ModuleStore from "@material-ui/icons/Store";
export const menu = [
  {
    title: "Home",
    path: "",
    icon: <Home />
  },
  {
    title: "Key-Value Manager",
    path: "key-value-manager",
    icon: <KVM />
  },
  {
    title: "Modules",
    icon: <Module />,
    submenu: [
      {
        title: "List Modules",
        path: "modules/list-modules",
        icon: <ListModule />
      },
      {
        title: "Install Modules",
        path: "modules/install-modules",
        icon: <InstallModule />
      },
      {
        title: "Modules Store",
        path: "modules/modules-store",
        icon: <ModuleStore />
      }
    ]
  }
];

export default { menu };
