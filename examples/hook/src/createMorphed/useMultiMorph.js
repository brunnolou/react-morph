import useMorph from "../useMorph";

export const useMultiMorph = (list, options) => {
  const fromMorphs = list.map(() => useMorph(options));

  // const fromMorph = {
  //   ref: () => console.log()
  // };

  return [fromMorphs, fromMorphs];
};
