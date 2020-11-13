import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from "react-router-dom";
import { getBlogs } from '../reducers/blogReducer';
import { BackButton } from '../styles/BackButtonStyles';
import { OneBlog } from './SingleBlogStyles';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import { newNotification } from '../reducers/notificationReducer';

const SingleBlog = () => {
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ loadingLike, setLoadingLike ] = useState(false);
  const curId = useParams().id;

  useEffect(() => {
    if(user) {
      dispatch(getBlogs());
    }
  }, [dispatch, user]);

  if(!user || !blogs.length) return null;

  const curBlog = blogs.filter(b => b.id === curId)[0];
  if(curBlog === undefined) return (<Redirect to='/' />);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleDeleteClick = () => {
    dispatch(newNotification({
      msg: `Delete blog: ${curBlog.title}?`,
      type: 4,
      length: 0,
      action: () => {
        history.goBack();
        dispatch(deleteBlog(curBlog, blogs));
      }
    }));
  };

  const handleLikeClick = () => {
    if(loadingLike) return;
    setLoadingLike(true);
    dispatch(likeBlog(curBlog, blogs));
    setLoadingLike(false);
  };

  return (
    <OneBlog>
      <h3>
        <BackButton onClick={handleGoBack} title='Back..'></BackButton>
        { curBlog.title }&nbsp;
        <span className='author'>by { curBlog.author }</span>
        <button className='delete-button' onClick={handleDeleteClick}>delete</button>
      </h3>
      <div className='blog-content'>
        <a href={curBlog.url} target='_new'>{ curBlog.url} </a><br />
        { curBlog.likes } { curBlog.likes === 1 ? 'like' : 'likes' }&nbsp;
        <button
          className={loadingLike ? 'like-button loading' : 'like-button'}
          onClick={handleLikeClick}>
          {loadingLike ? 'saving..' : 'like'}
        </button><br />
        Added by { curBlog.user.name }
      </div>
    </OneBlog>
  );
};

export default SingleBlog;