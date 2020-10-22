const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, item) => {
    if(favorite.likes < item.likes) return item;
    return favorite;
  }, blogs[0]) || {};
};

const mostBlogs = (blogs) => {
  const bloggerList = blogs.reduce((bloggers, item) => {
    if(bloggers.find((blogger) => { return blogger.author === item.author })) return bloggers;
    bloggers.push({
      author: item.author,
      blogs: blogs.filter(blogger => blogger.author === item.author).length,
    });
    return bloggers;
  }, []);
  return bloggerList.reduce((most, item) => {
    return most.blogs < item.blogs ? item : most;
  }, bloggerList[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};