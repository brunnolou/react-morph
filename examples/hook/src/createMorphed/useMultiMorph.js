import useMorph from "../useMorph";

export const useMultiMorph = (list, options) => {
  const morphs = list.map(() => useMorph(options));

  return morphs;
};
