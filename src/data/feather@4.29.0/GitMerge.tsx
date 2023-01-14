import { SVGAttributes } from "react"

// https://feathericons.dev/git-merge
export function GitMerge(props: SVGAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} {...props}>
			<circle cx="18" cy="18" r="3" />
			<circle cx="6" cy="6" r="3" />
			<path d="M6 21V9a9 9 0 0 0 9 9" />
		</svg>
	)
}
