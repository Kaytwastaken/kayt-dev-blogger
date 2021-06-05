import React, { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import NavBar from '../components/navBar'

const Post: React.FC = () => {
	const [title, setTitle] = useState('')
	const [excerpt, setExcerpt] = useState('')
	const [tags, setTags] = useState('')
	const [content, setContent] = useState('')
	
	const submitData = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		try {
			const body = { title, excerpt, tags, content }
			await fetch('/api/post/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			await Router.push('/')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<NavBar />
			<div>
				<form onSubmit={submitData} className="flex flex-col justify-center">
					<h1 className="p-2 m-2">New Post</h1>
					<input
						className="bg-primary-gray p-2 mx-4 my-2"
						type="text"
						autoFocus
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Title"
						value={title}
					/>
					<input
						className="bg-primary-gray p-2 mx-4 my-2"
						type="text"
						onChange={(e) => setExcerpt(e.target.value)}
						placeholder="Excerpt"
						value={excerpt}
					/>
					<input
						className="bg-primary-gray p-2 mx-4 my-2"
						type="text"
						onChange={(e) => setTags(e.target.value)}
						placeholder="Tags (comma separated)"
						value={tags}
					/>
					<textarea
						className="bg-primary-gray p-2 mx-4 my-2"
						onChange={(e) => setContent(e.target.value)}
						placeholder="Post content (Markdown-formatted)"
						value={content}
						cols={50}
						rows={10}
					/>
					<div>
						<input 
							className="disabled:bg-gray-400 hover:bg-secondary-gray font-display px-4 py-2 mx-4 my-2 w-48"
							type="submit"
							disabled={!title || !tags || !content}
							value="Publish"
						/>
						<span className="bg-red-400 px-4 py-2 m-2 w-min">
							<Link href='/'>
								<a className="text-black font-display">Cancel</a>
							</Link>
						</span>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Post