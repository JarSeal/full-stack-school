import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

import fs from 'fs';
import path from 'path';
import { act } from 'react-dom/test-utils';

let component;

beforeEach(() => {
  if(component && component.unmount) component.unmount();
  component = null;
});

const createStyles = (component) => {
  const cssFile = fs.readFileSync(
    path.resolve(__dirname, './Blog.css'),
    'utf8'
  );
  const cssFile2 = fs.readFileSync(
    path.resolve(__dirname, './Togglable.css'),
    'utf8'
  );
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile + cssFile2;
  component.container.append(style);
};

const blog = {
    id: 'someblogid',
    title: 'Some blog title',
    author: 'Tester Author',
    url: 'http://www.dummytext.com',
    likes: 2,
    user: {
      id: 'someuserid',
      username: 'someUsername',
      name: 'John Dow Jones'
    }
  };

test('renders Blog component', () => {
  act(() => {
    component = render(
      <Blog
        blog={blog}
        handleLikeClick={() => {}}
        handleDeleteClick={() => {}}
        user={null} />
    );
  });
  createStyles(component);

  expect(component.container).toHaveTextContent('Some blog title');
  expect(component.container).toHaveTextContent('Tester Author');
  const titleElem = component.container.querySelector('.title');
  expect(titleElem).toBeDefined();
  expect(titleElem).toBeVisible();
  const authorElem = component.container.querySelector('.author');
  expect(authorElem).toBeDefined();
  expect(authorElem).toBeVisible();
  const urlElem = component.container.querySelector('.info-row--url');
  expect(urlElem).not.toBeVisible();
  const likesElem = component.container.querySelector('.info-row--likes');
  expect(likesElem).not.toBeVisible();
});

test('click info button (togglable), show url & likes, and click like button twice', async () => {
  const mockHandler = jest.fn();

  act(() => {
    component = render(
      <Blog
        blog={blog}
        handleLikeClick={mockHandler}
        handleDeleteClick={mockHandler}
        user={null} />
    );
  });
  createStyles(component);
  const button = component.container.querySelector('.toggle-button');
  const buttonLike = component.container.querySelector('.like-button');
  act(() => {
    fireEvent.click(button);
  });

  act(() => {
    fireEvent.click(buttonLike);
  });

  act(() => {
    fireEvent.click(buttonLike);
  });

  const urlElem = component.container.querySelector('.info-row--url');
  const likesElem = component.container.querySelector('.info-row--likes');

  expect(urlElem).toBeVisible();
  expect(likesElem).toBeVisible();
  expect(mockHandler.mock.calls).toHaveLength(2);
});