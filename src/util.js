const getValueFromProgress = (from, to, progress) =>
  -progress * from + progress * to + from;

export const interpolateObject = (from = {}, to = {}) => t => ({
  ...Object.keys(from).reduce(
    (acc, key) => ({
      [key]: getValueFromProgress(from[key], to[key], t),
      ...acc,
    }),
    {},
  ),
});

export default {
  interpolateObject,
};
