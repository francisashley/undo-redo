import React from "react";
import ShardDocs from "@fa-repo/shard-docs";
import GettingStarted from "../GettingStarted";
import APIReference from "../APIReference";
import ReactExample from "../ReactExample";
import "./sanitize.css";
import "@fa-repo/shard-docs/dist/shard-docs.css";

/**
 * Docs
 */

const Docs = props => (
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

Docs.propTypes = {};
Docs.defaultProps = {};

export default Docs;
