import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAllUsers } from '../reducers/usersReducer';
import UserRow from './UserRow';
import { UserList } from './UserStyles';

const Users = () => {
  const user = useSelector(state => state.user);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if(user) {
      dispatch(getAllUsers());
    }
  }, [dispatch, user]);

  if(!user) return (<Redirect to='/' />);

  return (
    <div>
      <h3>Users</h3>
      <UserList>
        <li className='heading'>
          <span className='heading__name'>Name:</span>
          <span className='heading__blogs'>Blogs created:</span>
        </li>
        {!users
          ? null
          : users.sort((a, b) => {
            if ( a.name < b.name ) return -1;
            if ( a.name > b.name ) return 1;
            return 0;
          }).map(u =>
            <UserRow key={u.id} userData={u} />
          )
        }
      </UserList>
    </div>
  );
};

export default Users;