import Head from "next/head"
import Link, { LinkProps } from "next/link"

import { PropsWithChildren } from "react"
import { dataKeys } from "./data/data"
import { IconProps } from "./pages/[icon]"
import { RouteTransition } from "./route-transition"

function OrangeLink({ children, ...props }: PropsWithChildren<LinkProps>) {
	return (
		<Link className="flex h-24 items-center bg-[orange] px-12" {...props}>
			<div>{children}</div>
		</Link>
	)
}

export function SharedApp({ name, data, children }: PropsWithChildren<IconProps>) {
	return (
		<>
			{/* Meta */}
			<Head>
				<title>{name}</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* App */}
			<div className="p-16">
				<nav className="flex flex-wrap gap-4">
					<OrangeLink href="/">
						<div>Home</div>
					</OrangeLink>
					{dataKeys.map(name => (
						<OrangeLink key={name} href={`/${name}`}>
							<div>{name}</div>
						</OrangeLink>
					))}
				</nav>
				<main>
					<RouteTransition>{children}</RouteTransition>
					<RouteTransition>Hello world!</RouteTransition>
				</main>
			</div>
		</>
	)
}
