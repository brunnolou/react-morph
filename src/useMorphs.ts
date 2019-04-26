import useMorph from './useMorph';
import { MorphOptions, Morph } from './types';

type ObjectKey = {
  key?: string;
};

function useMorphs<
  A extends string,
  B extends string,
  C extends string,
  D extends string,
  E extends string,
  F extends string,
  G extends string,
  H extends string
>(
  keys: [A, B, C, D, E, F, G, H],
  options?: MorphOptions,
): { [key in A | B | C | D | E | F | G | H]: Morph };

function useMorphs<
  A extends string,
  B extends string,
  C extends string,
  D extends string,
  E extends string,
  F extends string,
  G extends string
>(
  keys: [A, B, C, D, E, F, G],
  options?: MorphOptions,
): { [key in A | B | C | D | E | F | G]: Morph };

function useMorphs<
  A extends string,
  B extends string,
  C extends string,
  D extends string,
  E extends string,
  F extends string
>(
  keys: [A, B, C, D, E, F],
  options?: MorphOptions,
): { [key in A | B | C | D | E | F]: Morph };

function useMorphs<
  A extends string,
  B extends string,
  C extends string,
  D extends string,
  E extends string
>(
  keys: [A, B, C, D, E],
  options?: MorphOptions,
): { [key in A | B | C | D | E]: Morph };

function useMorphs<
  A extends string,
  B extends string,
  C extends string,
  D extends string
>(
  keys: [A, B, C, D],
  options?: MorphOptions,
): { [key in A | B | C | D]: Morph };

function useMorphs<A extends string, B extends string, C extends string>(
  keys: [A, B, C],
  options?: MorphOptions,
): { [key in A | B | C]: Morph };

function useMorphs<A extends string, B extends string>(
  keys: [A, B],
  options?: MorphOptions,
): { [key in A | B]: Morph };

function useMorphs(keys, options = {}): ObjectKey {
  const morphObject = keys.reduce((acc: Morph, key: string, i: number) => {
    return { ...acc, [key]: useMorph({ zIndex: i, ...options }) };
  }, {});

  return morphObject;
}

export default useMorphs;
