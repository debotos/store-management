import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./style/style.css";
import configureStore from "./store/configureStore";
import MainRouter from "./components/Router";
import registerServiceWorker from "./registerServiceWorker";
import { startSetExpenses } from "./actions/expenses/expenses-actions";
import { startSetStock } from "./actions/stock/stock-action";

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

// Uncomment this line to work with Database
// store.dispatch(startSetExpenses()).then(() => {
//   return store.dispatch(startSetStock())
// }).then(() => {
//   ReactDOM.render(jsx, document.getElementById("root"));
// })


ReactDOM.render(jsx, document.getElementById("root"));

registerServiceWorker();
