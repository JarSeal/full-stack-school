import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Users = () => {
  const user = useSelector(state => state.user);

  if(!user) return (<Redirect to='/' />);

  return (
    <div>Users...</div>
  );
};

export default Users;