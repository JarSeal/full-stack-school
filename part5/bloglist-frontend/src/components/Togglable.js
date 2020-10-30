import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div className='togglable' style={{position: 'relative', maxWidth: '960px'}}>
      <div style={{display: visible ? 'none' : ''}}>
        <button onClick={toggleVisibility} className='toggle-button'>{props.label}</button>
      </div>
      <div style={{display: visible ? '' : 'none'}}>
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px'
        }}>
          <button
            onClick={toggleVisibility}
            title='cancel'
            className='close-button'></button>
        </div>
        {props.children}
      </div>
    </div>
  );
});

export default Togglable;