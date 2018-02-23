import React from "react";

import { storiesOf } from "@storybook/react";
import { linkTo } from "@storybook/addon-links";

import Simple from "../Simple";
import Card from "../App";
import MultipleText from "../MultipleText";

storiesOf("Advanced", module).add("Morphing from card to details", () => (
  <Card showApp={linkTo("Button")} />
));

storiesOf("Simple", module).add("Simple text", () => <Simple />);

storiesOf("Simple", module).add("Multiple text", () => <MultipleText />);
