const initState = {
  msg: '',
  type: 0
};

export const newNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: content
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  };
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data;
    case 'CLEAR_NOTIFICATION':
      return initState;
    default:
      return state;
  };
};

export default notificationReducer;