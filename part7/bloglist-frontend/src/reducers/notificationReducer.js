const initState = {
  msg: '',
  type: 0,
  phase: 0,
  length: 5000 // default time in ms
};

export const newNotification = (content) => {
  if(content.phase === undefined) content.phase = 1;
  if(content.length === undefined) content.length = initState.length;
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

export const changePhase = (phase) => {
  return {
    type: 'CHANGE_PHASE',
    phase
  };
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data;
    case 'CHANGE_PHASE':
      return { ...state, phase: action.phase };
    case 'CLEAR_NOTIFICATION':
      return initState;
    default:
      return state;
  };
};

export default notificationReducer;