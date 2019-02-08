import React, { useRef, useLayoutEffect } from "react";
import htmlTags from "./htmlTags";

const morphed = Component => {
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
      const node = nodeRef.current;

      morph.ref(node, willBack);

      return () => {
        isMountedRef.current = false;

        if (willBack) morph.ref(node, true, true);
      };
    }, []);

    return <Component ref={nodeRef} {...props} />;
  };

  return MorphedComponent;
};

htmlTags.forEach(domElement => {
  morphed[domElement] = morphed(domElement);
});

export default morphed;
