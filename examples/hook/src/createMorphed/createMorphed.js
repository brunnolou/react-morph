import React, { useRef, useLayoutEffect, useEffect, useState } from "react";

function createMorphed(Component) {
  const MorphedComponent = ({
    morph,
    willBack,
    morphs,
    index = null,
    ...props
  }) => {
    if (!morph) return <Component {...props} />;
    const isMountedRef = useRef(true);
    const nodeRef = useRef();

    useLayoutEffect(() => {
      // if (index !== null) {
      //   if (!morph.indexes[index]) {
      //     const prev = nodeRef.current;

      //     morph.setIndex(index, nodeRef.current);
      //   } else {
      // 		console.log("animate");
      //     // const to = nodeRef.current;

      //     // morph.ref(prev);
      //     // setTimeout(() => {
      //     //   morph.ref(to);
      //     // }, 100);
      //   }

      //   console.log("morph.indexes[" + index + "]: ", morph.indexes);

      //   return <Component {...props} />;
      // }

      const node = nodeRef.current;
      // node.style.opacity = 0;
      morph.ref(node, willBack);

      return () => {
        isMountedRef.current = false;
        if (willBack) morph.ref(node, true, true);
      };
    }, []);

    return <Component ref={nodeRef} {...props} />;
  };

  return MorphedComponent;
}

export const morphed = {
  h1: createMorphed("h1"),
  p: createMorphed("p"),
  div: createMorphed("div"),
  a: createMorphed("a")
};
