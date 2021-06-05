import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/client'

export default async function handle(req, res) {
	const postId = req.query.id
	const { title, excerpt, tags, content } = req.body
	const session = await getSession({ req })

	if (session) {
		if (session.user.email == process.env.VALID_EMAIL) {
			switch(req.method) {
				case 'PUT': {
					const result = await prisma.post.update({
						where: { id: Number(postId) },
						data: {
							title: title,
							excerpt: excerpt,
							tags: tags,
							content: content,
							updatedReadable: new Date().toDateString(),
							updatedAt: new Date().toISOString(),
						}
					})
					res.json(result)
					break
				}
		
				case 'DELETE': {
					const result = await prisma.post.delete({
						where: { id: Number(postId) },
					})
					res.json(result)
					break
				}
		
				default: {
					throw new Error (
						`The HTTP ${req.method} method is not supported at this route`
					)
				}
			}
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