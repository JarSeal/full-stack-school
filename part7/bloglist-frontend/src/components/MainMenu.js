import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';
import { NavLink, useHistory } from 'react-router-dom';
import { Menu, Info } from './MainMenuStyles';

const MainMenu = ({ ls }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout(ls));
    history.push('/');
  };

  const loggedInItems = () => {
    if(!user) return null;
    return(
      <span>
        <NavLink className='link' activeClassName='active' exact to='/users'>Users</NavLink>
        <Info className='main-menu__logged-in-info' style={{ display: 'inline-block', textAlign: 'right' }}>
          <span className='main-menu__info'>{user.name} logged in</span>
          <button className='main-menu__logout' onClick={() => handleLogout()}>logout</button>
        </Info>
      </span>
    );
  };

  return (
    <Menu className='main-menu'>
      <NavLink className='link' activeClassName='active' exact to='/'>Blogs</NavLink>
      { loggedInItems() }
    </Menu>
  );
};

export default MainMenu;