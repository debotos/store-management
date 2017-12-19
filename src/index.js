import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//Theme configuration
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import darkBaseTheme from "./components/ui-element/myDarkTheme";
// import getMuiTheme from "material-ui/styles/getMuiTheme";
//End Theme configuration
//CSS Style
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";

import configureStore from "./store/configureStore";
import MainRouter from "./components/Router";
import registerServiceWorker from "./registerServiceWorker";
import { startSetExistingDueFromServer } from "./actions/sells/prevDue-actions";
import { startSetExpenses } from "./actions/expenses/expenses-actions";
import { startSetStock } from "./actions/stock/stock-action";
import { startSetAddSellUnderCustomerHistory } from "./actions/sells/sells-history-actions";
import { startSetMemoNumber } from "./actions/sells/memo-no-actions";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    {/* paste the below line inside the MuiThemeProvider */}
    {/* muiTheme={getMuiTheme(darkBaseTheme)} */}
    <MuiThemeProvider>
      <MainRouter />
    </MuiThemeProvider>
  </Provider>
);

store.subscribe(() => {
  console.log(store.getState());
});

// Uncomment this line to work with Database
// store
//   .dispatch(startSetExpenses())
//   .then(() => {
//     return store.dispatch(startSetStock());
//   })
//   .then(() => {
//     return store.dispatch(startSetExistingDueFromServer());
//   })
//   .then(() => {
//     return store.dispatch(startSetAddSellUnderCustomerHistory());
//   })
//   .then(() => {
//     return store.dispatch(startSetMemoNumber());
//   })
//   .then(() => {
//     ReactDOM.render(jsx, document.getElementById("root"));
//   });

// store.dispatch(startSetStock()).then(() => {
//   ReactDOM.render(jsx, document.getElementById("root"));
// });

ReactDOM.render(jsx, document.getElementById("root"));

registerServiceWorker();
