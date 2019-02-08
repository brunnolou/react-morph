import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

import useMorph from "./useMorph";
import { useMultiMorph } from "./createMorphed/useMultiMorph";
import { morphed } from "./createMorphed/createMorphed";
const spring = {
  damping: 26,
  mass: 1,
  stiffness: 170
};

const Item = ({ morphs, index, name, id }) => (
  <morphed.div className="container" morph={morphs.container[index]}>
    <morphed.div className="avatar" morpha={morphs.focus[index]} />
    <morphed.p morpha={morphs.fade[index]}>{name}</morphed.p>
  </morphed.div>
);

const Details = ({ morphs, index, data: { name, id } }) => {
  return (
    <morphed.div
      willBack
      className="container container--lg"
      morph={morphs.container[index]}
    >
      <morphed.div willBack className="avatar" morpha={morphs.focus[index]} />
      <morphed.h1 willBack morpha={morphs.fade[index]}>
        {name}
      </morphed.h1>
    </morphed.div>
  );
};

function App() {
  const items = [
    { id: "1", name: "Hello Morph" },
    { id: "2", name: "Morphing is awesome" },
    { id: "3", name: "Multiple morphs?" }
  ];

  const morphs = {
    container: useMultiMorph(items, { spring }),
    fade: useMultiMorph(items, { spring, zIndex: 2 }),
    focus: useMultiMorph(items, { spring, zIndex: 3 })
  };

  return (
    <Router>
      <div className="App">
        <Route
          // exact
          path="/"
          render={({
            match: {
              params: { id }
            }
          }) => (
            <div>
              {items.filter(i => 1).map((i, index) => (
                <Link to={"/details/" + i.id} key={i.id}>
                  <Item {...i} morphs={morphs} index={index} />
                </Link>
              ))}
            </div>
          )}
        />
        <Route
          exact
          path="/details/:id"
          render={({
            match: {
              params: { id }
            }
          }) => {
            return (
              <Details
                key={id}
                morphs={morphs}
                index={items.findIndex(x => x.id === id)}
                data={items.find(x => x.id === id)}
              />
            );
          }}
        />

        <br />
      </div>
    </Router>
  );
}

export default App;
