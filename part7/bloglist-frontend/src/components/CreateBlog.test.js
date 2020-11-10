import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateBlog from './CreateBlog';
import { act } from 'react-dom/test-utils';

let component;

beforeEach(() => {
  if(component && component.unmount) component.unmount();
  component = null;
});

test('create new blog with form', () => {
  const mockHandler = jest.fn();
  act(() => {
    component = render(
      <CreateBlog handleCreateNew={mockHandler} blogRef={{}} />
    );
  });

  const input = component.container.querySelector('#create-title');
  const form = component.container.querySelector('#new-blog-form');

  fireEvent.change(input, {
    target: { value: 'testing create new blog with only title' }
  });
  fireEvent.submit(form);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0]).toBe('testing create new blog with only title');
});