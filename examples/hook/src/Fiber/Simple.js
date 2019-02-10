import React, { useState } from "react";
import useMorph from "../useMorph";

function Simple() {
  // ... (toggle state should be handled normally)
  const [isToggle, setToggle] = useState(true);
  const [isToggleTo, setToggleTo] = useState(false);

  const morph = useMorph();

  return (
    <>
      <style>
        {`
					.myStyle {
						float: left;
					}
					.myOtherStyle {
						float: right;
						font-size: 30px;
						color: red;
					}
				`}
      </style>

      <button onClick={() => setToggle(!isToggle)}>Toggle From</button>
      <button onClick={() => setToggleTo(!isToggleTo)}>Toggle To</button>

      <main>
        {/* {isToggle ? (
          <div key="hello" className="myStyle" {...morph}>
            From
          </div>
        ) : (
          <div key="world" className="myOtherStyle" {...morph}>
            To
          </div>
        )} */}

        {isToggle && (
          <div key="hello" className="myStyle" {...morph}>
            From
          </div>
        )}

        {isToggleTo && (
          <div key="world" className="myOtherStyle" {...morph}>
            To
          </div>
        )}
      </main>
    </>
  );
}

export default Simple;
