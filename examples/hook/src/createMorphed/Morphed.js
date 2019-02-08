import React, { useState } from "react";
import useMorph from "../useMorph";
import { morphed } from "./createMorphed";


function Morphed() {
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
          <morphed.div key="hello" className="myStyle" morph={morph}>
            Hello
          </morphed.div>
        ) : (
          <morphed.div key="world" className="myOtherStyle" morph={morph}>
            World
          </morphed.div>
        )}
      </main>
    </>
  );
}

export default Morphed;
