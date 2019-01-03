import React, { useState } from "react";
import useAnimatedToggle from "./useAnimatedToggle";

const AnimatedToggle = () => {
  const [bool, setToggle] = useState(false);
  const [aToggle] = useAnimatedToggle(bool);

  const toggle = () => setToggle(!bool);

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      {aToggle.map(({ item, t, state, in: inProp, ...rest }) => {
        return (
          <div key={item} style={{ opacity: t }}>
            {item ? "Hello" : "World"}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedToggle;
