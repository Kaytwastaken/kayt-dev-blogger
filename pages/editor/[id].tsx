import   React, { useState }   from 'react'
import { GetServerSideProps }  from 'next'
import   Router                from 'next/router'
import   Link                  from 'next/link'
import   prisma                from '../../lib/prisma'
import { getSession }          from 'next-auth/client'
import   NavBar                from '../../components/navBar'
import { PostProps }           from '../../components/Post'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx)

	if (session) {
		if (session.user.email == process.env.VALID_EMAIL) {
			const post = await prisma.post.findUnique({
				where: {
					id: Number(ctx.params?.id)
				},
				include: {
				author: {
						select: { name: true, email: true },
					},
				},
			})
			return {
				props: post
			}
		}
	} else {
		return { props: {} }
	}

}

const Post: React.FC<PostProps> = (props) => {
	const [title, setTitle] = useState(props.title)
	const [excerpt, setExcerpt] = useState(props.excerpt)
	const [tags, setTags] = useState(props.tags)
	const [content, setContent] = useState(props.content)

	const submitData = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		try {
			const body = { title, excerpt, tags, content }
			await fetch(`/api/post/${props.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			await Router.push('/')
		} catch (error) {
			console.error(error)
		}
	}

	const createdAt = props.createdReadable ? props.createdReadable : ''
	const updatedAt = props.updatedReadable ? props.updatedReadable : ''
	
	let dates
	if (createdAt != '') {
		dates = createdAt
		if (updatedAt != '') {
			dates = createdAt + ", updated " + updatedAt
		}
	}

	return(
		<div>
			<NavBar />
			<div>
				<form onSubmit={submitData} className="flex flex-col justify-center">
					<h1 className="p-2 m-2">Edit Post</h1>
					<input
						className="bg-secondary-gray p-2 mx-4 my-2"
						type="text"
						autoFocus
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Title"
						value={title}
					/>
					<input
						className="bg-secondary-gray p-2 mx-4 my-2"
						type="text"
						onChange={(e) => setExcerpt(e.target.value)}
						placeholder="Excerpt"
						value={excerpt}
					/>
					<input
						className="bg-secondary-gray p-2 mx-4 my-2"
						type="text"
						onChange={(e) => setTags(e.target.value.split(','))}
						placeholder="Tags (comma separated)"
						value={tags}
					/>
					<textarea
						className="bg-secondary-gray p-2 mx-4 my-2"
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