import React from "react";
import useMorph from "./useMorph";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
const spring = {
  damping: 26,
  mass: 1,
  stiffness: 170
};

const Item = ({ morph, name, id }) => (
  <div key="from" className="container" {...morph.morphContainer(id)}>
    {/* <div className="avatar" {...morph.morphFocus(id)} />
    <p {...morph.morphFade(id)}>{name}</p> */}
  </div>
);

const Details = ({ morph, data: { name, id } }) => {
  return (
    <div
      key="to"
      className="container container--lg"
      {...morph.morphContainer(id)}
    >
      {/* <div className="avatar" {...morph.morphFocus(id)} />
      <h1 key="fade-to" {...morph.morphFade(id)}>
        {name}
      </h1> */}
    </div>
  );
};

function App() {
  // const morphPage = useMorph({ spring });
  const morphContainer = useMorph({ spring });
  const morphFade = useMorph({ spring, zIndex: 2 });
  const morphFocus = useMorph({ spring, zIndex: 3 });

  const morph = {
		// morphPage,
    morphContainer,
    morphFade,
    morphFocus
  };

  const items = [
    { id: "1", name: "Hello Morph" },
    { id: "2", name: "Morphing is awesome" },
    { id: "3", name: "Multiple morphs?" }
  ];

  return (
    <Router>
      <div className="App">
        <Route
					exact
          path="/"
          render={({
            match: {
              params: { id }
            }
          }) => (
            <div>
              {items.filter(i => 1).map(i => (
                <Link to={"/details/" + i.id} key={i.id}>
                  <Item morph={morph} {...i} />
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
              <Details morph={morph} data={items.find(x => x.id === id)} />
            );
          }}
        />

        <br />
      </div>
    </Router>
  );
}

export default App;
