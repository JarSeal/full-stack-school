import React, { useState, useImperativeHandle } from 'react';
import './Togglable.css';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [phaser, setPhaser] = useState(0);

  const toggleVisibility = () => {
    setPhaser(1);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  const setAreaClass = (p, v) => {
    if(phaser > 0) {
      setTimeout(() => {
        if(phaser < 2)  {
          setPhaser(phaser + 1);
        } else {
          setPhaser(0);
          setVisible(!visible);
        }
      }, phaser === 2 ? 500 : 100);
    }
    return 'toggle-area phase-' + p + ' visi-' + v;
  };

  return (
    <div className='togglable' style={{ position: 'relative', maxWidth: '960px' }}>
      <div style={{ display: (visible || (!visible && phaser !== 0)) && !props.keepButtonVisible ? 'none' : '' }}>
        <button onClick={toggleVisibility} className='toggle-button'>{props.label}</button>
      </div>
      <div className={setAreaClass(phaser, visible)} style={{ transitionDuration: '600ms' }}>
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

Togglable.displayName = 'Togglable';

export default Togglable;