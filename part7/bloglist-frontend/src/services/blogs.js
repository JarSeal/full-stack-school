import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const newBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const likeBlog = async newObject => {
  const response = await axios.put(baseUrl + '/' + newObject.id, newObject);
  return response.data;
};

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(baseUrl + '/' + id, config);
  return response.data;
};

const newComment = async newObject => {
  const response = await axios.post('/api/comments', newObject);
  return response.data;
};

export default { getAll, setToken, newBlog, likeBlog, deleteBlog, newComment };