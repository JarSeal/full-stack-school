import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '../reducers/notificationReducer';

let timer;
const DEFAULT_TIME = 5000;

const Notification = () => {
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();
  const style = {
    border: 'solid',
    padding: 10,
    color: '#fff',
    marginTop: '10px',
    marginBottom: '10px',
    borderWidth: 1
  };

  const setStyle = () => {
    switch(notification.type) {
      case 1:
        return { ...style, backgroundColor: 'green' }
      case 2:
        return { ...style, backgroundColor: 'yellow', color: '#000' }
      case 3:
        return { ...style, backgroundColor: 'red' }
      default:
        return { ...style, display: 'none' }
    };
  };

  clearTimeout(timer);
  if(notification.type !== 0) {
    timer = setTimeout(() => {
      dispatch(clearNotification());
    }, notification.time * 1000 || DEFAULT_TIME);
  }

  return (
    <div style={setStyle()}>
      {notification.msg}
    </div>
  );
};

export default Notification;