import React, { useState } from "react";
import useDelay from "./useDelay";

const Simple = () => {
  const [list, setList] = useState(["one", "two", "three"]);
  const dList = useDelay(list);

  const removeOne = () => setList(["two", "three"]);

  return (
    <div>
      <ul>
        {dList.map(({ item, state, t, in: inProp }) => {
          return (
            <li key={item} style={{ opacity: t }}>
              {item} {state} t:{t} in:
              {inProp ? 'in' : 'not in'}
            </li>
          );
        })}
      </ul>
      <button onClick={removeOne}>Remove</button>
    </div>
  );
};

export default Simple;
