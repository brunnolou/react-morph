const defaultData = {
  in: true,
  t: 1,
  state: "entered"
};

const getItems = (list, data = defaultData) => {
  return list.map((item, index) => ({ item, index, ...data }));
};

export default getItems;
