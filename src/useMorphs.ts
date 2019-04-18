import useMorph from './useMorph';
import { MorphOptions } from './types';

type OptionsMapperFn = (items: any[]) => MorphOptions;

const useMorphs = (
  items: any[] | number,
  options: OptionsMapperFn | MorphOptions = {},
) => {
  let list = items;

  if (typeof list === 'number') list = Array(list).fill(0);

  const optionsFn = typeof options === 'function' ? options : () => options;

  return list
    .map(optionsFn)
    .map((options: MorphOptions, i: number) =>
      useMorph({ zIndex: i, ...options }),
    );
};

export default useMorphs;
