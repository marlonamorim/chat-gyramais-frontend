import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ChatLogin from './components/ChatLogin'
import ChatLogic from './components/ChatLogic'

const Routes = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ChatLogin} />
        <Route path="/chat/:nickname" component={ChatLogic} />
        <Route path="*" component={() => <h1>Página não encontrada</h1>} />
      </Switch>
    </BrowserRouter>
  );
  
  export default Routes;