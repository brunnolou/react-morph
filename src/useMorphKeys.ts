import useMorph from './useMorph';
import { MorphOptions } from './types';

type ObjectKey = {
  key: string;
};

const useMorphKeys = (
  list: string[],
  options: MorphOptions = {},
) => {
  const keysObj = list.reduce((acc, key: string, i) => {
    return { ...acc, [key]: useMorph({ zIndex: i, ...options }) };
  }, {});

  return keysObj;
};

export default useMorphKeys;
