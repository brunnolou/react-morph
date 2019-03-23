import useMorph from './useMorph';
import { MorphOptions } from './types';

const useMultiMorph = (list: any[], options: MorphOptions = {}) => {
  const morphs = list.map(() => useMorph(options));

  return morphs;
};

export default useMultiMorph;
