import React from "react";

import { storiesOf } from "@storybook/react";
import { linkTo } from "@storybook/addon-links";

import Simple from "../Simple";
import Card from "../App";

storiesOf("Advanced", module).add("Morphing from card to details", () => (
  <Card showApp={linkTo("Button")} />
));

storiesOf("Simple", module).add("with text", () => <Simple />);
