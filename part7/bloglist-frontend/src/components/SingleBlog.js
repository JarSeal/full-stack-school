import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams, useHistory } from "react-router-dom";
import { getBlogs } from '../reducers/blogReducer';
import { BackButton } from '../styles/BackButtonStyles';
import { OneBlog } from './SingleBlogStyles';
import { likeBlog, deleteBlog, createComment } from '../reducers/blogReducer';
import { newNotification } from '../reducers/notificationReducer';

const SingleBlog = () => {
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ loadingLike, setLoadingLike ] = useState(false);
  const [ comment, setComment ] = useState('');
  const curId = useParams().id;

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  if(!blogs.length) return null;

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

  const deleteButton = () => {
    if(!user || user.username !== curBlog.user.username) return null;
    return (
      <button className='delete-button' onClick={handleDeleteClick}>delete</button>
    );
  };

  const addComment = (e) => {
    e.preventDefault();
    if(!comment || !comment.trim().length) {
      dispatch(newNotification({
        msg: `Please write a comment..`,
        type: 2
      }));
      return;
    }
    dispatch(createComment(comment.trim(), curBlog.id, blogs, setComment));
  };

  return (
    <OneBlog>
      <h3>
        <BackButton onClick={handleGoBack} title='Back..'></BackButton>
        { curBlog.title }&nbsp;
        <span className='author'>by { curBlog.author }</span>
        { deleteButton() }
      </h3>
      <div className='blog-content'>
        <a href={curBlog.url} target='_new'>{ curBlog.url} </a><br />
        { curBlog.likes } { curBlog.likes === 1 ? 'like' : 'likes' }&nbsp;
        <button
          className={loadingLike ? 'like-button loading' : 'like-button'}
          onClick={handleLikeClick}>
          {loadingLike ? 'saving..' : 'like'}
        </button><br />
        Added by <Link to={'/users/' + curBlog.user.id}>{ curBlog.user.name }</Link>
      </div>
      <div className='blog-comments'>
        <h4>Comments</h4>
        <form className='new-comment-form' onSubmit={addComment} id='new-comment-form'>
          <div className='form-elem form-elem__input-text'>
            <label htmlFor='comment-field'>
              <span className='label-text'>New comment:</span>
              <input
                id='comment-field'
                className='input-text'
                type='text'
                value={comment}
                name='Comment'
                onChange={({ target }) => setComment(target.value)}
              />
            </label>
          </div>
          <div className='form-elem form-elem__submit'>
            <button type='submit' id='new-comment-button'>Create new</button>
          </div>
        </form>
        <div className='comments-list'>
          {curBlog.comments.map(c => <div key={c.id}>{ c.content }</div>)}
        </div>
      </div>
    </OneBlog>
  );
};

export default SingleBlog;