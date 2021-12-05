import config from "../package.json";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <style
      children={`a:link { text-decoration: none; }
a:visited { text-decoration: none; }
a:hover { text-decoration: none; }
a:active { text-decoration: none; }
html {
  height: 100vh;
}
body, #root {
  width: 100%;
  height: 100%;
}
 #root {
   background-color: rgb(212, 205, 198);
 }
`}
    />
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={10000}
    >
      <HashRouter>
        <App />
      </HashRouter>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
