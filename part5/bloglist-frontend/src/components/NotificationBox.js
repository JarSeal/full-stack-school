import React from 'react';
import PropTypes from 'prop-types';
import './NotificationBox.css';

let timer;

const setPhaseClass = (length, phase, note, setNote, transitionT) => {
  switch(phase) {
  case 1:
    clearTimeout(timer);
    timer = setTimeout(() => {
      setNote({ ...note, phase: 2 });
    }, transitionT);
    return ' notification--start';
  case 2:
    clearTimeout(timer);
    if(length !== 0) {
      timer = setTimeout(() => {
        setNote({ ...note, phase: 3 });
      }, length - 10);
    }
    return ' notification--middle';
  case 3:
    clearTimeout(timer);
    timer = setTimeout(() => {
      setNote({ ...note, phase: 4 });
    }, 10);
    return ' notification--end-begin';
  case 4:
    clearTimeout(timer);
    timer = setTimeout(() => {
      setNote({ msg: '', type: 0, length: 0, phase: 0 });
    }, transitionT);
    return ' notification--end-begin notification--end';
  default: return '';
  }
};

const setClassName = (note, setNote, transitionT) => {
  const { type, length, phase } = note;
  let baseClass = 'notification' + setPhaseClass(length, phase, note, setNote, transitionT);
  switch(type) {
  case 1: return baseClass + ' notification--done';
  case 2: return baseClass + ' notification--warning';
  case 3: return baseClass + ' notification--error';
  case 4: return baseClass + ' notification--warning notification--confirmation';
  default: return baseClass + ' notification--hidden';
  }
};

const handleConfirmation = (note, setNote, transitionT) => {
  setNote({ ...note, phase: 3 });
  setTimeout(note.action, transitionT);
};

const NotificationBox = ({ note, setNote }) => {
  const transitionT = 300; // Start and end transition time in ms
  const template = [];
  if(note && note.msg.length) {
    template.push(note.msg);
    if(note.type === 4) {
      template.push(<div key='confirm-area' className='notification__confirm-area'>
        <button
          onClick={() => handleConfirmation(note, setNote, transitionT)}
          title='Confirm'
          className='notification__button'
          key='confirm-button'>Confirm</button>&nbsp;
        <button
          onClick={() => setNote({ ...note, phase: 3 })}
          title='Cancel'
          className='notification__button'
          key='cancel-button'>Cancel</button>
      </div>);
    }
    template.push(
      <button
        onClick={() => setNote({ ...note, phase: 3 })}
        title='Close this notification'
        className='close-button'
        key='close-button'></button>
    );
  } else {
    template.concat(null);
  }
  return <div className='notification-box-wrapper'>
    <div className={setClassName(note, setNote, transitionT)} style={{ transitionDuration: transitionT + 'ms' }}>
      {template}
    </div>
  </div>;
};

NotificationBox.propTypes = {
  note: PropTypes.shape({
    msg: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    phase: PropTypes.number.isRequired
  }),
  setNote: PropTypes.func.isRequired
};

export default NotificationBox;
