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
      tree={[
        {
          group: "Docs",
          pages: [
            { page: "Getting started", composition: [<GettingStarted />] },
            { page: "API reference", composition: [<APIReference />] },
            { page: "React example", composition: [<ReactExample />] },
            { external: "Github", link: "https://github.com/fa-repo/undo-redo" }
          ]
        }
      ]}
    />
  </>
);

Docs.propTypes = {};
Docs.defaultProps = {};

export default Docs;
