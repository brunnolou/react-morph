import useMorph from "../useMorph";
import React, { useState } from "react";
import useAnimatedList from "../useDelay/useDelay";
import { morphed } from "./createMorphed";
import { useMultiMorph } from "./useMultiMorph";

function SimpleManyToOne() {
  //  (toggle state should be handled normally)
  const [currentIndex, open] = useState(null);

  const list = ["first", "second", "third"];
  // const morphs = [
  // 	useMorph(),
  // 	useMorph(),
  // 	useMorph(),
  // ]

  const [fromMorphs, toMorphs] = useMultiMorph(list, {});

  return (
    <>
      <style>
        {`
				nav {

				}
				.card {
					padding: 1rem 2rem;
					background: whitesmoke;
					font-family: sans-serif;
				}
				.modal {
					float: left;
					width: 100%;
					max-width: 320px;
				}
				.title {
					float: left;
					font-size: 30px;
					color: red;
					margin: 0;
				}
			`}
      </style>

      <main className="simple">
        <nav>
          {list.map((item, index) => (
            <morphed.a
              className="card"
              morph={fromMorphs[index]}
              // index={index}
              // morphs={morphs}
              onClick={() => open(index)}
              key={item}
            >
              {item}
            </morphed.a>
          ))}
        </nav>

        {currentIndex !== null && (
          <div key={currentIndex} className="modal">
            <morphed.h1
              className="title"
              morph={toMorphs[currentIndex]}
              // morphs={morphs}
              // index={currentIndex}
            >
              This is {list[currentIndex]}.
            </morphed.h1>
            <button onClick={() => open(null)}>Close</button>
          </div>
        )}
      </main>
      <h1>
        <span>{currentIndex}</span>
      </h1>
    </>
  );
}

export default SimpleManyToOne;
