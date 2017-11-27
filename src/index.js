import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./style/style.css";
import configureStore from "./store/configureStore";
import MainRouter from "./components/Router";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <MuiThemeProvider>
      <MainRouter />
    </MuiThemeProvider>
  </Provider>
);

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(jsx, document.getElementById("root"));
registerServiceWorker();
