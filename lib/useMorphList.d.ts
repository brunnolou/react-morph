import { MorphOptions } from './types';
declare type OptionsMapperFn = (items: any[]) => MorphOptions;
declare const useMorphList: (items: number | any[], options?: MorphOptions | OptionsMapperFn) => import("./types").Morph[];
export default useMorphList;
