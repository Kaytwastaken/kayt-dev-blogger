import { GetStaticProps } from 'next'
import Post, { PostProps } from '../components/Post'
import NavBar from '../components/navBar'
import prisma from '../lib/prisma'
import { useSession } from 'next-auth/client'

export const getStaticProps: GetStaticProps = async () => {
	const feed = await prisma.post.findMany({
		include: {
			author:{
				select: { name: true },
			},
		},
		orderBy: { updatedAt: 'desc' }
	})
	return { props: { feed } }
}

type Props = {
	feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
	const [session, loading] = useSession()
	
	if (session) {
		console.log(session)
	}

	return (
		<div>
			<NavBar />
			<div className="mt-4 xl:mt-8">
				{props.feed.map((post) => (
					<div key={post.id}>
						<Post post={post} />
					</div>
				))}
			</div>
		</div>
	)
}

export default Blog