import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BackEndTemplate from "./back-end/components/navigation/template";
import FrontEndTemplate from "./front-end/components/navigation/template";
function LoadTemplate(props) {
  const { match } = props;
  if (match.path.includes("backend")) {
    return <BackEndTemplate {...props} />;
  } else {
    return <FrontEndTemplate {...props} />;
  }
}
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/backend/" component={LoadTemplate}></Route>
        <Route path="/" component={LoadTemplate} exact></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
