const defaultData = {
  in: true,
  t: 1,
  state: "entered"
};

const getItems = options => list => {
  return list.map((item, index) => ({
    ...defaultData,
    item,
    index,
    key: options.key(item)
  }));
};

export default getItems;
