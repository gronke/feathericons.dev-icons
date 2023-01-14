import { SVGAttributes } from "react"

// https://feathericons.dev/x
export function X(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<line x1="18" x2="6" y1="6" y2="18" />
			<line x1="6" x2="18" y1="6" y2="18" />
		</svg>
	)
}
