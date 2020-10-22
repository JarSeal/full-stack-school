const listHelper = require('./../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(18);
  });
});

describe('favorite blog', () => {
  test('of empty list is zero', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual({});
  });
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });
  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    expect(result).toEqual(listWithManyBlogs[0]);
  });
});

describe('most blogs', () => {
  test('of empty list is zero', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual(undefined);
  });
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 3 });
  });
});

describe('most likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual(undefined);
  });
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(listWithManyBlogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 9 });
  });
});

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];
const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Rocket Science',
    author: 'Paul Mooney',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'This is another post',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Some title',
    author: 'Richard Nixon',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Some title 2',
    author: 'Richard Nixon',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Yet another post',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
  },
];