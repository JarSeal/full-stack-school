import React from 'react';
import { useHistory } from 'react-router-dom';
import { UserWrapper } from './UserStyles';

const UserRow = ({ userData }) => {
  const history = useHistory();

  const handleUserClick = () => {
    history.push('/users/' + userData.id);
  };

  return (<UserWrapper onClick={handleUserClick}>
    <h4 className='user-name'>{ userData.name }</h4>
    <span className='user-blog-count'>{ userData.blogs.length }</span>
  </UserWrapper>);
};

export default UserRow;