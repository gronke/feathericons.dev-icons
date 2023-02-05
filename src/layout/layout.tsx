import { PropsWithChildren } from "react"
import { Aside } from "./aside"
import { ExternalLinks } from "./external-links"
import { Header } from "./header"
import { Masks } from "./masks"
import { PageTransition } from "./page-transition"

export function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<ExternalLinks />
			<Header />
			<Masks />
			<div className="flex justify-center 2xl:pb-[calc(var(--mask-inset)_*_2)]">
				<div className="flex w-100% max-w-[var(--app-w)] bg-white shadow-[var(--shadow-2)] 2xl:rounded-[var(--app-rounding)]">
					{/* LHS */}
					<main className="w-100% min-w-0">
						<div className="sticky top-0 z-100 2xl:top-[var(--mask-inset)]">
							<div className="bg-[linear-gradient(to_bottom,_#fff_calc(32px_+_64px),_transparent)] py-32 px-64 2xl:rounded-tl-[var(--app-rounding)]">
								{/* <Nav /> */}
							</div>
						</div>
						<PageTransition>{children}</PageTransition>
					</main>
					{/* RHS */}
					{/* Use box-content here because of border-l */}
					<aside className="box-content hidden min-w-[var(--aside-w)] max-w-[var(--aside-w)] border-l lg:block">
						<div className="sticky top-0 z-100 2xl:top-[var(--mask-inset)]">
							<div className="bg-white 2xl:rounded-tr-[var(--app-rounding)]">
								<Aside />
							</div>
						</div>
					</aside>
				</div>
			</div>
		</>
	)
}
