const defaultData = {
  in: true,
  t: 1,
  state: "entered"
};

const getItems = (list, options) => {
  return list.map((item, index) => ({ ...defaultData, item, index }));
};

export default getItems;
