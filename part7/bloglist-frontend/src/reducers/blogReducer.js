import blogService from '../services/blogs';
import { newNotification } from './notificationReducer';

export const getBlogs = () => {
  return async dispatch => {
    const response = await blogService.getAll();
    dispatch({
      type: 'ALL_BLOGS',
      data: response
    });
  };
};

export const likeBlog = (blog, blogs) => {
  return async dispatch => {
    let updatedList = [];
    try {
      const userId = blog.user.id;
      const newLikes = blog.likes + 1;
      const body = Object.assign({}, blog, { user: userId, likes: newLikes });
      await blogService.likeBlog(body);
      updatedList = blogs.filter((b) => {
        if(b.id !== blog.id) return b;
        return null;
      });
      blog.likes = newLikes;
      updatedList = updatedList.concat(blog);
    } catch (error) {
      updatedList = blogs;
      dispatch(newNotification({
        msg: 'Error in saving like action.',
        type: 3,
        length: 0,
      }));
    }
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedList
    });
  };
};

export const deleteBlog = (blog, blogs) => {
  return async dispatch => {
    let updatedList = [];
    try {
      await blogService.deleteBlog(blog.id);
      updatedList = blogs.filter((b) => {
        if(b.id !== blog.id) return b;
        return null;
      });
      setTimeout(() => {
        dispatch(newNotification({
          msg: `Blog '${blog.title}' removed.`,
          type: 1
        }));
      }, 300);
    } catch (error) {
      updatedList = blogs;
      dispatch(newNotification({
        msg: 'Error in deleting blog.',
        type: 3,
        length: 0,
      }));
    }
    dispatch({
      type: 'DELETE_BLOG',
      data: updatedList
    });
  };
};

export const createBlog = (content, blogs, blogRef, setTitle, setAuthor, setUrl) => {
  return async dispatch => {
    let updatedList = [];
    try {
      const result = await blogService.newBlog(content);
      updatedList = blogs.concat(result);
      setTitle('');
      setAuthor('');
      setUrl('');
      dispatch(newNotification({
        msg: `New blog (${content.title}) saved!`,
        type: 1,
      }));
      if(blogRef) blogRef.current.toggleVisibility();
    } catch (error) {
      updatedList = blogs;
      if(error.response && error.response.status === 400 && error.response.data.errors !== undefined) {
        const errors = error.response.data.errors;
        if(errors.title !== undefined) {
          dispatch(newNotification({
            msg: 'Title cannot be empty.',
            type: 2,
          }));
          return;
        } else if(errors.url !== undefined) {
          dispatch(newNotification({
            msg: 'URL cannot be empty.',
            type: 2,
          }));
          return;
        }
      } else {
        dispatch(newNotification({
          msg: 'Error, could not create new blog!',
          type: 3,
          length: 0,
        }));
      }
    }
    dispatch({
      type: 'CREATE_BLOG',
      data: updatedList
    });
  };
};

const blogsReducer = (state = [], action) => {

  switch (action.type) {
  case 'ALL_BLOGS':
  case 'LIKE_BLOG':
  case 'DELETE_BLOG':
  case 'CREATE_BLOG':
    return action.data;
  default:
    return state;
  }
};

export default blogsReducer;