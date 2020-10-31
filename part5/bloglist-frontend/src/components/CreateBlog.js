import React, { useState } from 'react';
import blogService from './../services/blogs';

const handleCreateNew = async (
	e, title, author, url, setBlogNote, setTitle, setAuthor, setUrl, setBlogs, blogs, blogRef
) => {
	e.preventDefault();
	try {
    const result = await blogService.newBlog({
      title, author, url
		});
		const newBlogs = blogs.concat(result);
		setBlogs(newBlogs);
    setTitle('');
		setAuthor('');
		setUrl('');
    setBlogNote({
      msg: `New blog (${title}) saved!`,
      type: 1,
      length: 5000,
      phase: 1,
		});
		if(blogRef) blogRef.current.toggleVisibility();
  } catch (error) {
		if(error.response.status === 400 && error.response.data.errors !== undefined) {
			const errors = error.response.data.errors;
			if(errors.title !== undefined) {
				setBlogNote({
					msg: 'Title cannot be empty.',
					type: 2,
					length: 5000,
					phase: 1,
				});
				return;
			} else if(errors.url !== undefined) {
				setBlogNote({
					msg: 'URL cannot be empty.',
					type: 2,
					length: 5000,
					phase: 1,
				});
				return;
			}
		}
		setBlogNote({
			msg: 'Error, could not create new blog!',
			type: 3,
			length: 0,
			phase: 1,
		});
  }
};

const CreateBlog = ({setBlogNote, setBlogs, blogs, blogRef}) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	return (
		<div className='create-blog-form form-wrapper'>
			<h3>Create new blog</h3>
			<form onSubmit={(e) => handleCreateNew(
				e, title, author, url, setBlogNote, setTitle, setAuthor, setUrl, setBlogs, blogs, blogRef
			)}>
				<div className='form-elem form-elem__input-text'>
					<label htmlFor='create-title'>
						<span className='label-text'>Title *</span>
						<input
							id='create-title'
							className='input-text'
							type='text'
							value={title}
							name='Title'
							onChange={({target}) => setTitle(target.value)}
						/>
					</label>
				</div>
				<div className='form-elem form-elem__input-text'>
					<label htmlFor='create-author'>
						<span className='label-text'>Author</span>
						<input
							id='create-author'
							className='input-text'
							type='text'
							value={author}
							name='Author'
							onChange={({target}) => setAuthor(target.value)}
						/>
					</label>
				</div>
				<div className='form-elem form-elem__input-text'>
					<label htmlFor='create-url'>
						<span className='label-text'>URL *</span>
						<input
							id='create-url'
							className='input-text'
							type='text'
							value={url}
							name='URL'
							onChange={({target}) => setUrl(target.value)}
						/>
					</label>
				</div>
				<div className='form-elem form-elem__submit'>
          <button type='submit'>Create new</button>
					{blogRef &&
						<button
							type='button'
							className='cancel-button'
							onClick={() => blogRef.current.toggleVisibility()}>Cancel</button>
					}
        </div>
			</form>
		</div>
	);
};

export default CreateBlog;