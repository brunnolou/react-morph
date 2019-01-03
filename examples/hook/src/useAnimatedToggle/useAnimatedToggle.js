import useDelay from "../useDelay/useDelay";

const boolToArray = bool => {
  return [bool];
};

const useAnimatedToggle = (bool, options = {}) => {
  const list = boolToArray(bool);

  return useDelay(list, { key: b => String(b), ...options });
};

export default useAnimatedToggle;
