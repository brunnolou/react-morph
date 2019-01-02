import { useRef, useState, useEffect } from "react";
import arrayDiff from "./arrayDiff";
import getItems from "./getItems";

const defaultOptions = {
  key: x => x,
  springOptions: {}
};

const useDelay = (list, options) => {
  const { key } = { ...defaultOptions, ...options };
  const [dList, setList] = useState(getItems(list));

  const refList = useRef();
  const prevList = refList.current;
  const nextList = list;

  if (!prevList) {
    refList.current = list;

    return dList;
  }

  const prevKeys = prevList.map(key);
  const nextKeys = nextList.map(key);

  useEffect(() => {
    const diff = arrayDiff(prevKeys, nextKeys);

    const changed = diff.map(({ key, index, value }) => {
      return {
        item: key,
        in: value >= 0,
        t: value + 1,
        index,
        state: ""
      };
    });

    console.log("changed: ", changed);

    // setList(changed);
  }, nextKeys.concat(prevKeys));

  refList.current = list;

  return dList;
};

export default useDelay;
