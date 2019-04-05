import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import AddIcon from "./Add";
import ArrowIcon from "./Arrow";
import DownloadIcon from "./Download";
import GithubIcon from "./Github";

storiesOf("Icons", module)
  .add("Add", () => <AddIcon width={48} />)
  .add("Arrow", () => (
    <ArrowIcon
      width={48}
      variant={
        select("variant", ["increase", "decrease"], "increase") as "increase"
      }
    />
  ))
  .add("Download", () => <DownloadIcon width={48} />)
  .add("GitHub", () => <GithubIcon width={48} />);
