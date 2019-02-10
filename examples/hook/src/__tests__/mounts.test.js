import React from "react";
import ReactDOM from "react-dom";

it("renders react", () => {
  const div = document.createElement("div");
  ReactDOM.render(<div />, div);
  ReactDOM.unmountComponentAtNode(div);
});
