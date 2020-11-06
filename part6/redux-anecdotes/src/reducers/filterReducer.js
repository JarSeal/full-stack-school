const initState = '';

export const filterChange = (value) => {
  return {
    type: 'FILTER_CHANGE',
    value
  };
};

export const clearFilter = () => {
  return {
    type: 'CLEAR_FILTER'
  };
};

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FILTER_CHANGE':
      return action.value;
    case 'CLEAR_FILTER':
      return initState;
    default:
      return state;
  };
};

export default filterReducer;