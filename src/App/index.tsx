import React, { lazy, Suspense } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

const IndexPage = lazy(() => import(/* webpackChunkName: 'app' */ '../pages/app'));

const App: React.FC<any> = () => {
  return (
    <>
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" component={IndexPage} />
          </Switch>
        </Suspense>
      </HashRouter>
    </>
  )
}

export default hot(App);