import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';
import { Link } from "react-router-dom";

const MainMenu = ({ ls }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const loggedInItems = () => {
    if(!user) return null;
    return(
      <div>
        <Link className='main-menu__link' to='/users'>Users</Link>
        <div className='main-menu__logged-in-info' style={{ display: 'inline-block', textAlign: 'right' }}>
          <span className='main-menu__info'>{user.name} logged in</span>
          <button className='main-menu__logout' onClick={() => dispatch(logout(ls))}>logout</button>
        </div>
      </div>
    );
  };

  return (
    <nav className='main-menu'>
      <Link className='main-menu__link' to='/'>Blogs</Link>
      { loggedInItems() }
    </nav>
  );
};

export default MainMenu;