import React, { useState } from "react";
import useMorph from "../useMorph";

function Simple() {
  // ... (toggle state should be handled normally)
  const [isToggle, setToggle] = useState();

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

      <button onClick={() => setToggle(!isToggle)}>Toggle</button>

      <main>
        {isToggle ? (
          <div key="hello" className="myStyle" {...morph}>
            Hello
          </div>
        ) : (
          <div key="world" className="myOtherStyle" {...morph}>
            World
          </div>
        )}
      </main>
    </>
  );
}

export default Simple;
