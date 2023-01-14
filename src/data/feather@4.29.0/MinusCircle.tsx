import { SVGAttributes } from "react"

// https://feathericons.dev/minus-circle
export function MinusCircle(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<circle cx="12" cy="12" r="10" />
			<line x1="8" x2="16" y1="12" y2="12" />
		</svg>
	)
}
