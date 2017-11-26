import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './style/style.css';
import MainRouter from './components/Router';
import registerServiceWorker from './registerServiceWorker';

const jsx = (
  <MuiThemeProvider>
    <MainRouter/>
  </MuiThemeProvider>
)

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
