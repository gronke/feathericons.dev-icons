import { SVGAttributes } from "react"

// https://feathericons.dev/anchor
export function Anchor(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="5" r="3" />
			<line x1="12" x2="12" y1="22" y2="8" />
			<path d="M5 12H2a10 10 0 0 0 20 0h-3" />
		</svg>
	)
}
