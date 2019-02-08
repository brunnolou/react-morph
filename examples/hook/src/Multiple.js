import React from "react";
import useMorph from "./useMorph";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
import { useMultiMorph } from "./createMorphed/useMultiMorph";
import { morphed } from "./createMorphed/createMorphed";
const spring = {
  damping: 26,
  mass: 1,
  stiffness: 170
};

const Item = ({ morph, name, id }) => (
  <morphed.div key="from" className="container" morph={morph}>
    {/* <morphed.div className="avatar" {...morph.morphFocus} />
    <p {...morph.morphFade}>{name}</p> */}
  </morphed.div>
);

const Details = ({ morph, data: { name, id } }) => {
  return (
    <morphed.div willBack key="to" className="container container--lg" morph={morph}>
      {/* <morphed.div className="avatar" {...morph.morphFocus} />
      <h1 key="fade-to" {...morph.morphFade}>
        {name}
      </h1> */}
    </morphed.div>
  );
};

function App() {
  // const morphPage = useMorph({ spring });
  const morphContainer = useMorph({ spring });
  const morphFade = useMorph({ spring, zIndex: 2 });
  const morphFocus = useMorph({ spring, zIndex: 3 });

  const items = [
    { id: "1", name: "Hello Morph" },
    { id: "2", name: "Morphing is awesome" },
    { id: "3", name: "Multiple morphs?" }
  ];

  const [fromMorphs, toMorphs] = useMultiMorph(items, { spring });

  // const morph = {
  // 	// morphPage,
  //   morphContainer,
  //   morphFade,
  //   morphFocus
  // };

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
                  <Item morph={fromMorphs[index]} {...i} />
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
                morph={fromMorphs[items.findIndex(x => x.id === id)]}
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
