import { SVGAttributes } from "react"

// https://feathericons.dev/film
export function Film(props: SVGAttributes<SVGElement>) {
	return (
		<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect rx="2.18" ry="2.18" x="2" y="2" />
			<line x1="7" x2="7" y1="2" y2="22" />
			<line x1="17" x2="17" y1="2" y2="22" />
			<line x1="2" x2="22" y1="12" y2="12" />
			<line x1="2" x2="7" y1="7" y2="7" />
			<line x1="2" x2="7" y1="17" y2="17" />
			<line x1="17" x2="22" y1="17" y2="17" />
			<line x1="17" x2="22" y1="7" y2="7" />
		</svg>
	)
}
