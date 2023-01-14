import { SVGAttributes } from "react"

// https://feathericons.dev/move
export function Move(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<polyline points="5 9 2 12 5 15" />
			<polyline points="9 5 12 2 15 5" />
			<polyline points="15 19 12 22 9 19" />
			<polyline points="19 9 22 12 19 15" />
			<line x1="2" x2="22" y1="12" y2="12" />
			<line x1="12" x2="12" y1="2" y2="22" />
		</svg>
	)
}
