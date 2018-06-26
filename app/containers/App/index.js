import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ChatPage from 'containers/ChatPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import './app.scss';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
