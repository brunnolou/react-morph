import React from "react";
import { useState } from "react";
import useMorph from "./useMorph";

import "./App.css";
const spring = {
  damping: 26,
  mass: 1,
  stiffness: 70
};
const Item = ({ morph }) => (
  <div key="from" className="container" {...morph.morphContainer()}>
    <div className="avatar" {...morph.morphFocus()} />
    <p {...morph.morphFade()}>Hello Morph hook!</p>
  </div>
);

const Details = ({ morph }) => {
  return (
    <div
      key="to"
      className="container container--lg"
      {...morph.morphContainer()}
    >
      <div className="avatar" {...morph.morphFocus()} />
      <h1 key="fade-to" {...morph.morphFade()}>
        Hello Morph hook!
      </h1>
    </div>
  );
};

function App() {
  const [toggle, setCount] = useState(1);

  const onClick = () => setCount(c => !c);

  const morphContainer = useMorph({ spring });
  const morphFade = useMorph({ type: "fade", spring });
  const morphFocus = useMorph({ spring });

  const morph = {
    morphContainer,
    morphFade,
    morphFocus
  };

  return (
    <div className="App">
      <button onClick={onClick}>- Morph -</button>
      {/* <button onClick={() => setCount(c => (c + 1) % 3)}>- Morph -</button> */}
      <br />
      {toggle ? (
        <Details morph={morph} />
      ) : (
        <Item morph={morph} />
      )}
      {/* {toggle === 0 && <div className="from" {...morph3} />}
      {toggle === 1 && <div className="to" {...morph3} />}
      {toggle === 2 && <div className="three" {...morph3} />} */}
    </div>
  );
}

export default App;
