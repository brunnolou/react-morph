import React from "react";

const Simple = () => (
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
            <p {...from("description")}>Panorama Grossmünster limmat river</p>
          </a>

          <div>
            <h1 {...to("title")}>Zurich</h1>
            <br />
            <h2 {...to("description")}>Panorama Grossmünster limmat river</h2>

            <a onClick={() => go(0)} href="#/back" {...fadeIn()}>
              Back
            </a>
          </div>
        </div>
      )}
    </ReactMorph>
  </div>
);

export default Simple;
