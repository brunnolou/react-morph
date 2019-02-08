import useMorph from "../useMorph";

export const useMultiMorph = (list, options) => {
  const morphs = list.map(() => useMorph(options));

  // const fromMorph = {
  //   ref: () => console.log()
  // };

  return morphs;
};
