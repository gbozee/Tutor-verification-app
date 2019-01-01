import * as serviceWorker from "./serviceWorker";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import ReactDOM from "react-dom";
import { Flex } from "@rebass/emotion";
import { Route, Redirect, Link } from "react-router-dom";
import ProtectedRoute from "tuteria-shared/lib/shared/ProtectedRoute";
import { devAdapter, liveAdapter } from "./adapters";
import WithRouter from "tuteria-shared/lib/shared/PageSetup";
import appContext from "./appContext";
// import appFirebase from "./adapters/backupFirebase";

const TutorDetailPage = React.lazy(() => import("./pages/TutorDetailPage"));
const TutorListPage = React.lazy(() => import(`./pages/TutorListPage`));
const WorkingSection = React.lazy(() => import(`./pages/WorkingSection`));

function App() {
  return (
    <WithRouter
      adapter={liveAdapter}
      context={appContext}
    //   firebase={appFirebase}
      toNextPage={props => props.history.push("/tutor-list")}
      heading={
        <Flex
          pb={3}
          justifyContent="space-between"
          css={css`
            flex-wrap: wrap;
            > a {
              padding-right: 10px;
              padding-bottom: 10px;
            }
          `}
        >
          <Link to="/tutor-list">Tutor List Page</Link>
          <Link to="/tutor-working-section">Working Section</Link>
        </Flex>
      }
    >
      <ProtectedRoute
        path="/tutor-list"
        exact
        render={props => (
          <TutorListPage detailPageUrl={slug => `/tutor-list/${slug}`} />
        )}
      />
      <Route path="/tutor-list/:slug" component={TutorDetailPage} />
      <Route
        path="/tutor-working-section"
        render={props => (
          <WorkingSection
            {...props}
            detailPageUrl={slug => `/worked-records/${slug}?email=true`}
          />
        )}
      />
      <Route path="/worked-records/:email" component={TutorDetailPage} />
      <Redirect to="/tutor-list" />
    </WithRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
