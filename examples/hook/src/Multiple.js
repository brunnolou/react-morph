import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import useMorph from "./useMorph";
import { useMultiMorph } from "react-morph";
const spring = {
  damping: 26,
  mass: 1,
  stiffness: 170
};

const Item = ({ morphs, index, name, id }) => (
  <div className="container" {...morphs.container[index]}>
    <div className="avatar" {...morphs.focus[index]} />
    <p {...morphs.fade[index]}>{name}</p>
  </div>
);

const Details = ({ morphs, index, data: { name, id } }) => {
  return (
    <div
      className="container container--lg"
      {...morphs.container[index]}
      willBack
    >
      <div willBack className="avatar" {...morphs.focus[index]} />

      <h1 willBack {...morphs.fade[index]}>
        {name}
      </h1>
    </div>
  );
};

function App() {
  const [keepFrom, setKeepFrom] = useState(false);

  const items = [
    { id: "1", name: "Hello Morph" },
    { id: "2", name: "Morphing is awesome" },
    { id: "3", name: "Multiple morphs?" }
  ];

  const morphs = {
    container: useMultiMorph(items, { spring, keepFrom }),
    fade: useMultiMorph(items, { spring, keepFrom, zIndex: 2 }),
    focus: useMultiMorph(items, { spring, keepFrom, zIndex: 3 })
  };

  return (
    <Router>
      <div className="App">
        <label>
          {keepFrom ? "Remove" : "Keep"} previous
          <input
            type="checkbox"
            value={!keepFrom}
            onChange={() => setKeepFrom(!keepFrom)}
          />
        </label>
        <br />

        <Route
          exact={!keepFrom}
          path="/"
          render={() => (
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
