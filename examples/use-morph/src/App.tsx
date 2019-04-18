import React, { Component, useState } from 'react';
import logo from './logo.svg';
import { useMorph } from 'react-morph';

import './App.css';

const spring = { damping: 26, mass: 1, stiffness: 170 };

function Morph() {
  const morph = useMorph({ spring });
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {toggle ? (
        <img key="one" {...morph} src={logo} className="App-logos" alt="logo" />
      ) : (
        <img
          key="two"
          {...morph}
          src={logo}
          className="App-logos small"
          alt="logo"
        />
      )}
      <button onClick={() => setToggle(!toggle)}>Let's morph!</button>
    </>
  );
}

const App = () => {
  return (
    <div className="App">
      <Morph />
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
