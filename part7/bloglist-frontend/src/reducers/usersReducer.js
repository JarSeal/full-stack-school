import userService from '../services/user';
import { newNotification } from './notificationReducer';

export const getAllUsers = () => {
  return async dispatch => {
    let users = null;
    try {
      users = await userService.getAllUsers();
    } catch (exception) {
      dispatch(newNotification({
        msg: 'Error in getting users\' data.',
        type: 3,
        length: 0,
      }));
    }
    dispatch({
      type: 'GET_ALL',
      data: users
    });
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

const usersReducer = (state = null, action) => {
  switch (action.type) {
  case 'GET_ALL':
    return action.data;
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
};

export default usersReducer;