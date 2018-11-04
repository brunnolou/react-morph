import React, { useState, useEffect } from "react";

const Delayed = ({ duration, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, duration);
  }, []);

  return show && <div>{children()}</div>;
};

export default Delayed;
