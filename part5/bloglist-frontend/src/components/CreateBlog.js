import React, { useState } from 'react';

const handleCreateNew = (e) => {
	console.log('Create new form sent');
};

const CreateBlog = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	return (
		<div className="create-blog-form form-wrapper">
			<h3>Create new blog</h3>
			<form onSubmit={(e) => handleCreateNew(e)}>
				<div className="form-elem form-elem__input-text">
					<label htmlFor="create-title">
						<span className="label-text">Title:</span>
						<input
							id="create-title"
							className="input-text"
							type="text"
							value={title}
							name="Title"
							onChange={({target}) => setTitle(target.value)}
						/>
					</label>
				</div>
			</form>
		</div>
	);
};

export default CreateBlog;