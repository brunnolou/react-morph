import { MorphOptions, Morph } from './types';
declare function useMorphs<A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string, H extends string>(keys: [A, B, C, D, E, F, G, H], options?: MorphOptions): {
    [key in A | B | C | D | E | F | G | H]: Morph;
};
declare function useMorphs<A extends string, B extends string, C extends string, D extends string, E extends string, F extends string, G extends string>(keys: [A, B, C, D, E, F, G], options?: MorphOptions): {
    [key in A | B | C | D | E | F | G]: Morph;
};
declare function useMorphs<A extends string, B extends string, C extends string, D extends string, E extends string, F extends string>(keys: [A, B, C, D, E, F], options?: MorphOptions): {
    [key in A | B | C | D | E | F]: Morph;
};
declare function useMorphs<A extends string, B extends string, C extends string, D extends string, E extends string>(keys: [A, B, C, D, E], options?: MorphOptions): {
    [key in A | B | C | D | E]: Morph;
};
declare function useMorphs<A extends string, B extends string, C extends string, D extends string>(keys: [A, B, C, D], options?: MorphOptions): {
    [key in A | B | C | D]: Morph;
};
declare function useMorphs<A extends string, B extends string, C extends string>(keys: [A, B, C], options?: MorphOptions): {
    [key in A | B | C]: Morph;
};
declare function useMorphs<A extends string, B extends string>(keys: [A, B], options?: MorphOptions): {
    [key in A | B]: Morph;
};
export default useMorphs;
