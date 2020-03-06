import React from "react";
import { routes } from "./routes";
import { Switch, Route } from "react-router-dom";
/**
*function return a switch containing the routes of the BackEnd.
* Routes are defines in the routes.jsx file
@param props {Object} receives props of the router
*/
export default function HandleRoute(props) {
  const { match } = props;
  return (
    <Switch>
      {routes.map((item, index) => {
        // {
        //   console.log(`${match.path}${item.path}`);
        // }
        return (
          <Route
            exact
            path={`${match.path}${item.path}`}
            key={index}
            component={item.component()}
          ></Route>
        );
      })}
      ;
    </Switch>
  );
}
