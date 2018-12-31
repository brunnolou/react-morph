import useMorph from "../useMorph";
import { useState } from "react";
import React from "react";

function Simple() {
  // ... (toggle state should be handled normally)

  const [currentKey, open] = useState();
  const morph = useMorph();
  const list = ["first", "second", "third"];

  return (
    <main class="simple">
      {list.map(key => (
        <a {...morph(key)} onClick={() => open(key)} key={key}>
          {key}
        </a>
      ))}

      {currentKey && (
        <div key={currentKey} className="modal" {...morph(currentKey)}>
          <h1>This is {currentKey}.</h1>
          <button onClick={() => open(null)}>
            Close
          </button>
        </div>
      )}
    </main>
  );
}

export default Simple;
