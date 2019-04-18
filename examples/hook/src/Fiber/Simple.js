import React, { useState } from 'react';
import { useMorph } from 'react-morph';

const springs = [
  {
    damping: 26,
    mass: 1,
    stiffness: 170,
  },
  {
    damping: 2,
    mass: 1,
    stiffness: 170,
  },
];

function Simple() {
  const [keepFrom, setKeepFrom] = useState(true);
  const [springType, setSpring] = useState(true);
  const [up, forceUpdate] = useState();

  // ... (toggle state should be handled normally)
  const [isToggle, setToggle] = useState(true);
  const [isToggleTo, setToggleTo] = useState(false);

  const morph = useMorph({ keepFrom, spring: springs[Number(!up)] });

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
      {!keepFrom ? 'Remove' : 'Keep'} previous
      {!keepFrom ? (
        <button onClick={() => setToggle(!isToggle)}>Toggle From</button>
      ) : (
        <button onClick={() => setToggleTo(!isToggleTo)}>Toggle To</button>
      )}
      <br />
      <main>
        <label>
          <input
            type="checkbox"
            value={!keepFrom}
            onChange={() => setKeepFrom(!keepFrom)}
          />
        </label>
        <br />
        <button onClick={() => forceUpdate(!up)}>Force update</button>
        <br />
        <br />
        <br />

        {!keepFrom ? (
          <div>
            {isToggle ? (
              <div key="hello" className="myStyle" {...morph}>
                From
              </div>
            ) : (
              <div key="world" className="myOtherStyle" {...morph}>
                To
              </div>
            )}
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </main>
    </>
  );
}

export default Simple;
