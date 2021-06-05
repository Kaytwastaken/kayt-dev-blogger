import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'

const NavBar: React.FC = () => {
	
	const router = useRouter()
	const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname
	const [session, loading] = useSession()

	const noLeft = (
		<div className="ml-4 xl:ml-8">
			<div className="hidden xs:block">
				<Link href="/">
					<a><h1>&#060;Kayt.dev blog=false /&#062;</h1></a>
				</Link>
			</div>
			<div className="block xs:hidden">
				<Link href="/">
					<a><h1>&#060;Kayt.dev blog /&#062;</h1></a>
				</Link>
			</div>
		</div>
	)

	let left = (
		noLeft
	)

	let right = null

	if (loading) {
		left = (
			noLeft
		)

		right = (
			<div className="mr-auto">
				<p>Validating Session...</p>
			</div>
		)
	}
	
	if (!session) {
		left = (
			noLeft
		)

		right = (
			<div className="ml-auto mr-4 xl:mr-8 my-auto ">
				<Link href="/api/auth/signin">
					<a data-active={isActive('/signup')}><h3 className="hover:underline font-body">Log in</h3></a>
				</Link>
			</div>
		)
	}

	if (session) {
		console.log(session)
		
		left = (
			<div className="flex">
				<div className="ml-4 xl:ml-8">
					<Link href="/">
						<a>
							<h1 className="hidden lg:block">&#060;Kayt.dev blog=<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">true</span> /&#062;</h1>
							<h1 className="block lg:hidden">&#060;Kayt.dev <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">blog</span> /&#062;</h1>
						</a>
					</Link>
				</div>
				<div className="ml-8 xmd:ml-4 xl:ml-8 my-auto">
					<Link href="/editor">
						<a>
							<h3 className="block xmd:hidden font-body">New</h3>
							<h3 className="hidden xmd:block font-body">New Post</h3>
						</a>
					</Link>
				</div>
			</div>
		)

		right = (
			<div className="ml-auto flex">
				<div className="my-auto mx-2 xl:mx-4">
					<img src={session.user.image} alt={session.user.name + "'s GitHub profile picture"} width="40" height="40"/>
				</div>
				<div className="hidden xmd:block my-auto">
					<span>{session.user.name}<br />({session.user.email})</span>
				</div>
				<div className="my-auto mx-4 xl:mx-8">
					<button onClick={() => signOut()}>
						<a><h3 className="font-body">Log out</h3></a>
					</button>
				</div>
			</div>
		)
	}
	
	return (
		<nav className="flex content-center bg-primary-gray">
			{left}
			{right}
		</nav>
	)
}

export default NavBar