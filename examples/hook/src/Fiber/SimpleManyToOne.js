import useMorph from "../useMorph";
import React, { useState } from "react";
import useAnimatedList from "../useDelay/useDelay";

function SimpleManyToOne() {
  // ... (toggle state should be handled normally)
  const [currentIndex, open] = useState(null);

  const list = ["first", "second", "third"];
  const [dList] = useAnimatedList(list.filter(x => x !== list[currentIndex]));
  // const morphs = [
  // 	useMorph(),
  // 	useMorph(),
  // 	useMorph(),
  // ]
  const morphs = list.map(() => useMorph());

  return (
    <>
      <style>
        {`
				nav {
					display: flex;
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
          {dList.map(({ item, key }, index) => (
            <a
              className="card"
              {...morphs[index]}
              onClick={() => open(index)}
              key={key}
            >
              {key}
            </a>
          ))}
        </nav>

        {currentIndex !== null && (
          <div key={currentIndex} className="modal">
            <h1 className="title" {...morphs[currentIndex]}>
              This is {list[currentIndex]}.
            </h1>
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
