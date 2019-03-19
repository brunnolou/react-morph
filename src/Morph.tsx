import * as React from 'react';
import useMorph from './useMorph';

const useFadeIn = () => {
  return () => ({});
};

const useHide = () => {
  return () => ({});
};

const Morph = ({ children, ...props }) => {
  const morph = useMorph();
  const fadeIn = useFadeIn();
  const hide = useHide();

  return React.Children.only(
    children({
      from: morph,
      to: morph,

      fadeIn: fadeIn,
      fadeOut: fadeIn,

      hide: hide,
    }),
  );
};

export default Morph;
