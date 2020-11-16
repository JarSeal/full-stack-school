import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { getAllUsers } from '../reducers/usersReducer';
import { getBlogs } from '../reducers/blogReducer';
import { BackButton } from '../styles/BackButtonStyles';
import { UserList, UserWrapper } from './UserStyles';

const User = () => {
  const user = useSelector(state => state.user);
  const users = useSelector(state => state.users);
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const history = useHistory();
  const curId = useParams().id;

  useEffect(() => {
    if(user) {
      dispatch(getAllUsers());
      dispatch(getBlogs());
    }
  }, [dispatch, user]);

  if(!user || !users) return null;

  const curUser = users.filter(u => u.id === curId)[0];
  if(curUser === undefined) return (<Redirect to='/users' />);
  const userBlogs = blogs.filter(b => b.user.id === curId);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleBlogClick = (blogId) => {
    history.push('/blogs/' + blogId);
  };

  return (
    <div>
      <h3><BackButton onClick={handleGoBack} title='Back..'></BackButton>{ curUser.name }</h3>
      <h4>Blogs ({ userBlogs.length }):</h4>
      <UserList>
        <li className='heading'>
          <span className='heading__name'>Blog title:</span>
        </li>
        {userBlogs.sort((a, b) => {
          const aTitle = a.title.toLowerCase();
          const bTitle = b.title.toLowerCase();
          if(aTitle < bTitle) return -1;
          if(aTitle > bTitle) return 1;
          return 0;
        }).map(b =>
          <UserWrapper key={b.id} onClick={() => handleBlogClick(b.id)}>{ b.title }</UserWrapper>
        )
        }
      </UserList>
    </div>
  );
};

export default User;