import React from "react";
import ShardDocs from "@fa-repo/shard-docs";
import GettingStarted from "../GettingStarted";
import APIReference from "../APIReference";
import ReactExample from "../ReactExample";
import "@fa-repo/shard-docs/dist/shard-docs.css";
import "./App.scss";

/**
 * App
 */

const App = props => (
  <>
    <ShardDocs
      title="@fa-repo/undo-redo documentation"
      structure={[
        { type: "page", title: "Getting started", composition: [<GettingStarted />] },
        { type: "page", title: "API reference", composition: [<APIReference />] },
        {
          type: "page",
          title: "React example",
          composition: [<ReactExample />]
        },
        { type: "external", title: "Github", link: "https://github.com/fa-repo/undo-redo" }
      ]}
    />
  </>
);

App.propTypes = {};
App.defaultProps = {};

export default App;
