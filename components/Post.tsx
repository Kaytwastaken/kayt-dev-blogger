import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { useSession } from 'next-auth/client'

export type PostProps = {
	id: number;
	title: string;
	author: {
		name: string;
		email: string;
	} | null;
	content: string;
	excerpt: string;
	tags: string[];
	createdReadable: string;
	createdTime: string;
	updatedReadable: string;
	updatedTime: string;
};

async function deletePost(id: number, title: string) {
	if (confirm('Delete post "' + title + '" with id: ' + id + '?')) {
		await fetch(`/api/post/${id}`, {
			method: 'DELETE'
		})
		Router.reload()
	} else {
		console.log("cancelled")
	}
}

async function editPost(id: number) {
	Router.push(`/editor/${id}`)
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
	const [session, loading] = useSession()

	const createdAt = post.createdReadable ? post.createdReadable : ''
	const updatedAt = post.updatedReadable ? post.updatedReadable : ''
	
	let dates
	if (createdAt != '') {
		dates = createdAt
		if (updatedAt != '') {
			if (updatedAt != createdAt) {
				dates = createdAt + ", updated " + updatedAt
			} else {
				dates = createdAt
			}
		}
	}
	
	let forcedExcerpt
	if (post.content.length > 100) {
		forcedExcerpt = post.content.slice(0, 100) + '...'
	} else {
		forcedExcerpt = post.content
	}

	let buttons
	if (session) {
		console.log(session)
		buttons = (
			<div className="w-5/6 sm:w-2/3 lg:w-1/2 flex mx-auto m-2">
				<div onClick={()=> editPost(post.id)} className="bg-yellow-300 hover:bg-yellow-400 flex-grow mx-4 text-center">
					<p>Edit</p>
				</div>
				<div onClick={() => deletePost(post.id, post.title)} className="bg-pink-400 hover:bg-pink-500 flex-grow mx-4 text-center">
					<p>Delete</p>
				</div>
			</div>
		)
	}

	return (
		// Router.push(`https://kayt.dev/blog/p/${post.id}`)
		<div className="card hover:bg-primary-gray">
			<h3 onClick={() => Router.push(`http://localhost:3000/blog/p/${post.id}`)} className="hover:underline cursor-pointer">{post.title}</h3>
			<hr />
			{ buttons }
			<p><b>Tags: </b>{post.tags.join(', ')}</p>
			<p><b>Dates: </b>{dates ? dates : "null"}</p>
			<p><b>Excerpt: </b>{post.excerpt ? post.excerpt : "(Forced) " + forcedExcerpt}</p>
			<p><b>Content:</b></p>
			<ReactMarkdown children={post.content} />
		</div>
	);
};

export default Post;
