import React, { Component } from "react";
import ReactMorph from "./Morph";
import "./App.css";

// Create a new spring
class App extends Component {
  faces = [
    {
      username: "brunnolou",
      src: "https://avatars1.githubusercontent.com/u/2729225?s=460&v=4"
    },
    {
      username: "lucalanca",
      src: "https://avatars3.githubusercontent.com/u/389459?s=460&v=4"
    },
    {
      username: "florianginetta",
      src: "https://avatars3.githubusercontent.com/u/30113109?s=460&v=4"
    },
    {
      username: "lejoe",
      src: "https://avatars3.githubusercontent.com/u/1759?s=460&v=4"
    }
  ];

  render() {
    return (
      <div>
        <style>{`
					strong, h1, h2, p {
						display: inline-block;
					}
				`}</style>
        <ReactMorph>
          {({ from, to, fadeIn, fadeOut, go, init }) => (
            <div>
              <a onClick={() => init(1)}>
                <strong {...from("title")}>Zurich</strong>
                <br />
                <p {...from("description")}>
                  Panorama Grossmünster limmat river
                </p>
              </a>

              <div>
                <h1 {...to("title")}>Zurich</h1>
                <br />
                <h2 {...to("description")}>
                  Panorama Grossmünster limmat river
                </h2>

                <a onClick={() => go(0)} href="#/back" {...fadeIn()}>
                  Back
                </a>
              </div>
            </div>
          )}
        </ReactMorph>
      </div>
    );
  }
}

export default App;
