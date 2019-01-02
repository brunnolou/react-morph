const defaultData = {
  in: true,
  t: 1,
  state: null
};

const getItems = (list, data = defaultData) => {
  return list.map(item => ({ item, ...data }));
};

export default getItems;
