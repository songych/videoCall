import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

const Home = lazy(() => import(/* webpackChunkName: 'app' */ './pages/Home'));

const App: React.FC<any> = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route from="/" component={Home} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default hot(App);