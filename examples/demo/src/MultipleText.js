import React, { Component } from "react";
import ReactMorph from "./lib";

class MultipleText extends Component {
  text = "This is a Simple text transition with React Morph!".split(" ");

  render() {
    return (
      <ReactMorph>
        {({ from, to, go }) => (
          <div>
            <div className="text-container" onClick={() => go(1)}>
              {this.text.map((text, key) => (
                <span key={text + key} {...from(text + key)}>
                  {text}
                </span>
              ))}
            </div>
            <div
              className="text-container text-container--small"
              onClick={() => go(0)}
            >
              {this.text.map((text, key) => (
                <span key={text + key} {...to(text + key)}>
                  {text}
                </span>
              ))}
            </div>
          </div>
        )}
      </ReactMorph>
    );
  }
}

export default MultipleText;
