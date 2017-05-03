import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {BrowserRouter, Route, DefaultRoute, Redirect} from 'react-router-dom';
import TxTemplate from './TxTemplate';
import BlockTemplate from './BlockTemplate';
import Base from './Base';

// ReactDOM.render(
//   <App/>,
//   document.getElementById('root')
// );
// using forceRefresh on browser router now..
import createHistory from 'history/createBrowserHistory'
const customHistory = createHistory()

ReactDOM.render(
  <BrowserRouter history={customHistory} forceRefresh={true}>
    <Base>
      <Route exact path="/" render={() => <Redirect to="/block/z4QJh988wttY4rTJgLpmx57E3gEbun1vXmMVpBAwbA4pzE8MkLw" />} />
      <Route path='/block/:block' component={BlockTemplate} />
      <Route path='/tx/:txid' type="replace" component={TxTemplate}/>
    </Base>
  </BrowserRouter>,
  document.getElementById('root')
);
