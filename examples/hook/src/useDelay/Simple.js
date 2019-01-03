import React, { useState } from "react";
import useDelay from "./useDelay";

const colors = {
  entered: "black",
  exiting: "orange",
  entering: "green"
};

const Simple = () => {
  const [list, setList] = useState(["one", "two", "three"]);
  const [dList, state] = useDelay(list, {
    spring: {
      damping: 26,
      mass: 1,
      stiffness: 202
    }
  });

  const removeOne = () => setList(["two", "three"]);
  const push = () => setList([...list, "new " + list.length]);

  return (
    <div>
      <h1>{state}</h1>
      <ul>
        {dList.map(({ item, t, state, in: inProp, ...rest }) => {
          return (
            <li key={item} style={{ opacity: t, color: colors[state] }}>
              <span>In: {String(inProp)}</span>
              <span> State: {state}</span>
            </li>
          );
        })}
      </ul>
      <button onClick={removeOne}>Remove</button>
      <button onClick={push}>Push</button>
    </div>
  );
};

export default Simple;
