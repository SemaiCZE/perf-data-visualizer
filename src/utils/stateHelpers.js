export const statusTypes = {
  EMPTY: 'empty',
  LOADING: 'loading',
  FULFILED: 'fulfiled'
};

export const createStateEntry = (s = statusTypes.EMPTY, d = null) => {
  return {
    status: s,
    data: d
  };
};

export const initialState = {
  tests: createStateEntry(),
  testVersions: {},
  testValues: {},
  error: null
};

export const isEmpty = entry => !entry || entry.status === statusTypes.EMPTY;
export const isLoading = entry =>
  !entry || entry.status === statusTypes.LOADING;
export const isReady = entry =>
  !!entry && entry.status === statusTypes.FULFILED && !!entry.data;
export const getJsData = entry => {
  const data = isReady(entry) ? entry.data : null;
  return data && data.toJS ? data.toJS() : data;
};
