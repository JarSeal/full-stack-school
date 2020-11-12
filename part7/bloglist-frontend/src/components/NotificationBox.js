import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationWrapper } from './NotificationStyles';
import { changePhase, clearNotification } from '../reducers/notificationReducer';

let timer;

const NotificationBox = () => {
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();
  const transitionT = 300; // Start and end transition time in ms
  const template = [];

  const setPhaseClass = (length, phase) => {
    switch(phase) {
    case 1:
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(changePhase(2));
      }, transitionT);
      return ' notification--start';
    case 2:
      clearTimeout(timer);
      if(length !== 0) {
        timer = setTimeout(() => {
          dispatch(changePhase(3));
        }, length - 10);
      }
      return ' notification--middle';
    case 3:
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(changePhase(4));
      }, 10);
      return ' notification--end-begin';
    case 4:
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(clearNotification());
      }, transitionT);
      return ' notification--end-begin notification--end';
    default: return '';
    }
  };

  const setClassName = () => {
    const { type, length, phase } = notification;
    let baseClass = 'notification' + setPhaseClass(length, phase);
    switch(type) {
    case 1: return baseClass + ' notification--done';
    case 2: return baseClass + ' notification--warning';
    case 3: return baseClass + ' notification--error';
    case 4: return baseClass + ' notification--warning notification--confirmation';
    default: return baseClass + ' notification--hidden';
    }
  };

  const handleConfirmation = () => {
    dispatch(changePhase(3));
    setTimeout(notification.action, transitionT);
  };

  if(notification && notification.msg.length) {
    template.push(notification.msg);
    if(notification.type === 4) {
      template.push(<div key='confirm-area' className='notification__confirm-area'>
        <button
          onClick={handleConfirmation}
          title='Confirm'
          className='notification__button notification__button--confirm'
          key='confirm-button'>Confirm</button>&nbsp;
        <button
          onClick={() => dispatch(changePhase(3))}
          title='Cancel'
          className='notification__button notification__button--cancel'
          key='cancel-button'>Cancel</button>
      </div>);
    }
    template.push(
      <button
        onClick={() => dispatch(changePhase(3))}
        title='Close this notification'
        className='close-button'
        key='close-button'></button>
    );
  } else {
    template.concat(null);
  }
  return <div className='notification-box-wrapper'>
    <NotificationWrapper className={setClassName()} style={{ transitionDuration: transitionT + 'ms' }}>
      {template}
    </NotificationWrapper>
  </div>;
};

export default NotificationBox;