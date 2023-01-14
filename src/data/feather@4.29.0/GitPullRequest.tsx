import { SVGAttributes } from "react"

// https://feathericons.dev/git-pull-request
export function GitPullRequest(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="18" cy="18" r="3" />
			<circle cx="6" cy="6" r="3" />
			<path d="M13 6h3a2 2 0 0 1 2 2v7" />
			<line x1="6" x2="6" y1="9" y2="21" />
		</svg>
	)
}
