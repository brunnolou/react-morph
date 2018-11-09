import React from "react";
import useMorph from "./useMorph";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
const spring = {
  damping: 26,
  mass: 1,
  stiffness: 170
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
  const morphContainer = useMorph({ spring });
  const morphFade = useMorph({ spring, zIndex: 2 });
  const morphFocus = useMorph({ spring, zIndex: 3 });

  const morph = {
    morphContainer,
    morphFade,
    morphFocus
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/details/">Details</Link>
            </li>
          </ul>
        </nav>

        <Route exact path="/" render={() => <Item morph={morph} />} />
        <Route
          exact
          path="/details/"
          render={() => <Details morph={morph} />}
        />

        <br />
      </div>
    </Router>
  );
}

export default App;
