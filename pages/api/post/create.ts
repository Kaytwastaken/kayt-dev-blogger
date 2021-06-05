import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/client'

export default async function handle(req, res) {
	const { title, excerpt, tags, content} = req.body
	const session = await getSession({ req })

	if (session) {
		if (session.user.email == process.env.VALID_EMAIL) {
			const result = await prisma.post.create({
				data: {
					title: title,
					excerpt: excerpt,
					tags: tags,
					content: content,
					author: { connect: { email: session?.user?.email } },
					createdReadable: new Date().toDateString(),
					createdAt: new Date().toISOString(),
					updatedReadable: new Date().toDateString(),
					updatedAt: new Date().toISOString(),
				}
			})
			res.json(result)
		} else {
			res.status(403).json({
				message: "You must be logged in as a valid user to use this route."
			})
		}
	} else {
		res.status(401).json({
			message: "You must be logged in to use this route."
		})
	}
	
}