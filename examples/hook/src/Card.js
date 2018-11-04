import React, { useState } from "react";
import useMorph from "./useMorph";

import "./App.css";
const spring = {
  damping: 26,
  mass: 1,
  stiffness: 70
};

function App() {
  const [toggle, setCount] = useState(1);

  const onClick = () => setCount(c => !c);

  const morphContainer = useMorph({ spring, onClick });
  const morphFade = useMorph({ type: "fade", spring });
  const morphFocus = useMorph({ spring });

  // const mock = {};

  return (
    <div className="App">
      <button onClick={onClick}>- Morph -</button>
      <br />
      {toggle ? (
        <div key="from" className="container" {...morphContainer()}>
          <div className="avatar" {...morphFocus()} />
          <p {...morphFade()}>Hello Morph hook!</p>
        </div>
      ) : (
        <div key="to" className="container container--lg" {...morphContainer()}>
          <div className="avatar" {...morphFocus()} />
          <h1 key="fade-to" {...morphFade()}>
            Hello Morph hook!
          </h1>
        </div>
      )}
    </div>
  );
}

export default App;
