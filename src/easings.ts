import { Easing } from 'types';

// Credits to: https://gist.github.com/gre/1650294

export const createEaseIn = (power: number) => (t: number) =>
  Math.pow(t, power);
export const createEaseOut = (power: number) => (t: number) =>
  1 - Math.abs(Math.pow(t - 1, power));
export const createEaseInOut = p => t =>
  t < 0.5 ? createEaseIn(p)(t * 2) / 2 : createEaseOut(p)(t * 2 - 1) / 2 + 0.5;

export const createReversed = (easing: Easing) => (t: number) => 1 - easing(1 - t);

export const easeInSin = (t: number) =>
  1 + Math.sin((Math.PI / 2) * t - Math.PI / 2);
export const easeOutSin = (t: number) => Math.sin((Math.PI / 2) * t);
export const easeInOutSin = (t: number) =>
  (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;

export const easeIn = createEaseIn(2);
export const easeOut = createEaseOut(2);
export const easeInOut = createEaseInOut(2);

export const linear = (x: number) => x;
