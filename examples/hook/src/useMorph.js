import { useRef, useCallback, useReducer, useEffect } from "react";

import morphTransition from "./morphTransition";
import { getRect } from "./utils";

const defaultsOptions = {
  portalElement: document.body,
  getMargins: false,
  type: "morph",
  spring: {
    damping: 26,
    mass: 1,
    stiffness: 170
  }
};

const initialState = {};

function reducer(state, { type, id, value }) {
  switch (type) {
    case "SET":
      return { ...state, [id]: { ...(state[id] || {}), ...value } };
    case "RESET":
      return { [id]: { ...(state[id] || {}), ...value } };
    default:
      return state;
  }
}

export default function useMorph(opts = defaultsOptions) {
  const options = { ...defaultsOptions, ...opts };

  const [refs, dispatch] = useReducer(reducer, initialState);
  const setRefs = (id, value) => dispatch({ type: "SET", id, value });

  // const prevToRef = useRef();
  // const preFromRect = useRef();

  let isAnimating = false;
  let cleanup;

  const animate = ({ id, from, to, rectFrom, rectTo }) => {
    if (!to) {
      console.warn("Morph created without any mounted element!");
      return;
    }

    to.style.visibility = "visible";

    if (!from) return;
    // if (isAnimating) return;
    isAnimating = true;

    const { prevSpring } = refs[id] || {};
    // console.log("refs[id]: ", refs[id]);

    switch (options.type) {
      case "fade":
      case "morph":
      default:
        cleanup = morphTransition({
          from,
          to,
          rectFrom,
          rectTo,
          fromValue:
            prevSpring !== undefined && prevSpring.currentValue !== 1
              ? 1 - prevSpring.currentValue
              : 0,
          initialVelocity:
            prevSpring !== undefined && prevSpring.currentVelocity !== 0
              ? prevSpring.currentVelocity * -1
              : 0,
          onUpdate(s) {
            setRefs(id, { prevSpring: s });
          },
          options
        });

        setRefs(id, { cleanupFrom: cleanup });
    }

    return () => {
      if (isAnimating) cleanup();
    };
	};



	useEffect(() => {
		console.log('oi')
	}, [])

  const getRef = (id = "__MORPH__") => {
		return useCallback(
			node => {
				console.log("id: ", id, node);
        const { from, rectFrom, cleanupFrom } = refs[id] || {};

        if (cleanupFrom) cleanupFrom();
        if (!node) {
          if (cleanup) cleanup();
          return;
        }
        const to = node;

        const rectTo = getRect(to, { getMargins: options.getMargins });

        // console.log("to: ", to);
        // console.log("refs[id]: ", refs);

        animate({ id, from, rectFrom, to, rectTo });

        const morphElement = {
          from: to,
          rectFrom: rectTo,
          cleanupFrom: cleanup
        };

        if (to && from && node) {
          dispatch({ type: "RESET", id, value: morphElement });
          // console.log("RESET: ", id, from);
        } else {
          setRefs(id, morphElement);
          // console.log('SET: ', id, from);
        }
      },
      [id]
    );
  };

  const props = id => ({
    ref: getRef(id),
    style: { visibility: "hidden" },
    "data-rm": id,
    ...(options.onClick ? { onClick: options.onClick } : {})
  });

  return props;
}
