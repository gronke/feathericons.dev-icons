import * as feather from "@icons/feather"
import * as wkPaymentProcessors from "@icons/wolf-kit/payment"
import * as wkSocialMedia from "@icons/wolf-kit/social-media"

import { CSSProperties, PropsWithChildren, ReactNode, useEffect, useRef, useState } from "react"
import { IconComponent } from "./components/dynamic-icon"
import { Checkbox, FormSlider } from "./controls"
import { Clone } from "./hoc"
import { cx, toKebabCase } from "./lib"
import { TheWolfKit } from "./the-wolf-kit"
import { TypographySans, TypographySmallCaps, TypographySmallSans } from "./typography"

function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

const featherEntries: [string, IconComponent][] = Object.entries(feather).map(([k, v]) => [toNameCase(k), v])
const wkSocialMediaEntries: [string, IconComponent][] = Object.entries(wkSocialMedia).map(([k, v]) => [toNameCase(k), v])
const wkPaymentProcessorsEntries: [string, IconComponent][] = Object.entries(wkPaymentProcessors).map(([k, v]) => [toNameCase(k), v])

const entries = [...featherEntries, ...wkSocialMediaEntries, ...wkPaymentProcessorsEntries]

////////////////////////////////////////////////////////////////////////////////

function SearchBar() {
	const ref = useRef<HTMLInputElement | null>(null)
	const [value, setValue] = useState("")

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.metaKey && e.key === "p") {
				e.preventDefault() // Sorry printers
				ref.current!.focus()
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	return (
		<div
			className={cx(`
				flex h-[var(--search-bar-height)] rounded-1e3 bg-[var(--slate-100)] shadow-[inset_0_0_0_1px_var(--slate-200)]
				[&:is(:hover,_:focus-within)]:bg-[white]
				[&:is(:hover,_:focus-within)]:shadow-[var(--inset-hairline-shadow)]
			`)}
		>
			<feather.Search
				className="m-[calc((var(--search-bar-height)_-_var(--small-icon-height))_/_2)] h-[var(--small-icon-height)] w-[var(--small-icon-height)] text-[var(--slate-400)] [&:has(+_:focus-visible)]:text-[var(--slate-600)]"
				strokeWidth={4}
			/>
			<input
				ref={ref}
				className={cx(
					TypographySans.className,
					"flex-1 bg-[transparent] text-[var(--slate-700)] placeholder:text-[var(--slate-500)] focus-visible:placeholder:opacity-0",
				)}
				type="text"
				placeholder="Press ⌘P to focus"
				value={value}
				onChange={e => setValue(e.currentTarget.value)}
			/>
		</div>
	)
}

function Hairline() {
	return (
		// Use h-0 so <hr> can stack
		<div className="h-0">
			<hr className="border-[var(--slate-300)]" />
		</div>
	)
}

function Fieldset({ children }: PropsWithChildren) {
	return (
		<fieldset className="flex flex-col gap-[var(--spacing)] py-[var(--spacing)] px-[var(--padding-x)] first-of-type:pt-0 last-of-type:pb-[var(--padding-y)]">
			{children}
		</fieldset>
	)
}

// NOTE: <legend> breaks layout :(
function Legend({ name, canUndo = true }: { name: string; canUndo?: boolean }) {
	return (
		<div className="flex items-center justify-between">
			<TypographySmallCaps className="text-[var(--slate-700)]">{name}</TypographySmallCaps>
			{canUndo && (
				<feather.RotateCcw
					className="m-[calc((var(--container-height)_-_var(--small-icon-height))_/_2)] h-[var(--small-icon-height)] w-[var(--small-icon-height)] cursor-pointer select-none text-[var(--slate-300)] hover:text-[var(--slate-600)]"
					strokeWidth={4}
				/>
			)}
		</div>
	)
}

function CheckboxList({ children }: PropsWithChildren) {
	return (
		<ul
			className={cx(`
				h-[var(--container-h)] items-center rounded-[calc(var(--container-height)_/_2)]
				[&:is(:hover,_:has(:focus-visible))]:bg-[var(--slate-100)]
				[ul_&:is(:hover,_:has(:focus-visible))]:bg-[var(--slate-200)]
				[ul_&]:ml-[calc(var(--container-height)_/_2)]
			`)}
		>
			{children}
		</ul>
	)
}

function CheckboxItem({ name, icon: Icon }: { name: string; icon: IconComponent }) {
	const [checked, setChecked] = useState(false)

	return (
		<Clone<"li">
			onClick={e => {
				setChecked(curr => !curr)
			}}
			onKeyDown={e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault()
					setChecked(curr => !curr)
				}
			}}
			aria-checked={checked}
		>
			<li
				className={cx(`
					flex cursor-pointer select-none items-center rounded-[calc(var(--container-height)_/_2)]
					[ul_&:is(:hover:active,_:has(:focus-visible))]:bg-[var(--slate-200)]
					[ul_ul_&:is(:hover:active,_:has(:focus-visible))]:bg-[var(--slate-300)]
				`)}
			>
				<Icon className="m-[calc((var(--container-height)_-_var(--icon-height))_/_2)] h-[var(--icon-height)] w-[var(--icon-height)] text-[var(--slate-700)]" />
				<TypographySans className="flex-1 text-[var(--slate-700)]">{name}</TypographySans>
				<Checkbox />
			</li>
		</Clone>
	)
}

function LicenseItem({ icon: Icon, children }: PropsWithChildren<{ icon: IconComponent }>) {
	return (
		<div className="flex gap-8">
			<Icon className="m-[calc((13px_*_1.75_-_var(--small-icon-height))_/_2)] ml-0 h-[var(--small-icon-height)] w-[var(--small-icon-height)] text-[var(--slate-800)]" />
			{/* Must use !important here */}
			<TypographySmallSans tag="p" className="!leading-[1.75] text-[var(--slate-700)]">
				{children}
			</TypographySmallSans>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function AsideLayout({ head, body }: { head: ReactNode; body: ReactNode }) {
	const [didScroll, setDidScroll] = useState(false)

	return (
		<aside className="w-[var(--sidebar-width)]">
			{/* Use flex h-screen flex-col here */}
			<div className="sticky top-0 flex h-screen flex-col bg-[white] shadow-[var(--hairline-r-shadow)]">
				<nav
					className="sticky top-0 z-10 p-[var(--padding)] [&[data-state-did-scroll=true]]:shadow-[var(--hairline-b-shadow)]"
					data-state-did-scroll={didScroll}
				>
					{head}
				</nav>
				{/* Use flex h-screen flex-col here */}
				<div className="flex h-screen flex-col overflow-y-scroll" onScroll={e => setDidScroll(e.currentTarget.scrollTop > 0)}>
					{body}
				</div>
			</div>
		</aside>
	)
}

function Aside() {
	return (
		<AsideLayout
			head={<SearchBar />}
			body={
				<>
					<Fieldset>
						{/* <Legend name="Icons" /> */}
						<div className="flex flex-col gap-8">
							<CheckboxList>
								<CheckboxItem name="Feather" icon={feather.Feather} />
							</CheckboxList>
							<CheckboxList>
								{/* Shrink icon from leading <CheckboxItem> */}
								<CheckboxItem
									name="Social"
									icon={p => (
										<feather.ChevronDown
											style={{
												color: "var(--slate-400)",
												transform: "scale(0.75)",
											}}
											strokeWidth={4}
											{...p}
										/>
									)}
								/>
								<CheckboxList>
									<CheckboxItem name="Original" icon={wkSocialMedia.Twitter} />
									<CheckboxList>
										<CheckboxItem name="Circle" icon={wkSocialMedia.TwitterCircle} />
										<CheckboxItem name="Square" icon={wkSocialMedia.TwitterSquare} />
									</CheckboxList>
								</CheckboxList>
								<CheckboxList>
									<CheckboxItem name="Mono" icon={wkSocialMedia.TwitterMono} />
									<CheckboxList>
										<CheckboxItem name="Circle" icon={wkSocialMedia.TwitterCircleMono} />
										<CheckboxItem name="Square" icon={wkSocialMedia.TwitterSquareMono} />
									</CheckboxList>
								</CheckboxList>
							</CheckboxList>
							<CheckboxList>
								{/* Shrink icon from leading <CheckboxItem> */}
								<CheckboxItem
									name="Payment processors"
									icon={p => (
										<feather.ChevronDown
											style={{
												color: "var(--slate-400)",
												transform: "scale(0.75)",
											}}
											strokeWidth={4}
											{...p}
										/>
									)}
								/>
								<CheckboxList>
									<CheckboxItem name="Original" icon={wkPaymentProcessors.Stripe} />
									<CheckboxList>
										<CheckboxItem name="Filled" icon={wkPaymentProcessors.Stripe1} />
									</CheckboxList>
								</CheckboxList>
								<CheckboxList>
									<CheckboxItem name="Mono" icon={wkPaymentProcessors.Stripe2} />
									<CheckboxList>
										<CheckboxItem name="Filled" icon={wkPaymentProcessors.Stripe3} />
									</CheckboxList>
								</CheckboxList>
							</CheckboxList>
						</div>
					</Fieldset>
					{/* <Hairline />
					<Fieldset>
						<Legend name="Color" />
					</Fieldset> */}
					<Hairline />
					<Fieldset>
						<Legend name="Size" />
						<FormSlider />
					</Fieldset>
					<Hairline />
					<Fieldset>
						<Legend name="Stroke width" />
						<FormSlider />
					</Fieldset>
					<Hairline />
					{/* TODO */}
					{/* <div className="flex-1"></div> */}
					{/* <Hairline /> */}
				</>
			}
		/>
	)
}

////////////////////////////////////////////////////////////////////////////////

//// <div
//// 	className="grid auto-rows-[var(--grid-row-size)] grid-cols-[repeat(auto-fill,_minmax(var(--grid-col-size),_1fr))] gap-32"
//// 	style={{ "--grid-col-size": "128px", "--grid-row-size": "128px" } as CSSProperties}
//// >
//// 	{entries.map(([name, Icon]) => (
//// 		<div key={name} className="group/a flex flex-col gap-8">
//// 			<div className="group/button flex flex-1 cursor-pointer select-none items-center justify-center rounded-4 bg-[var(--slate-100)] group-hover:active:shadow-[none]">
//// 				<Icon className="min-h-32 min-w-32 text-[var(--slate-800)] group-hover/button:group-active/button:text-[white]" />
//// 			</div>
//// 			{/* Optically align leading lines */}
//// 			<div className="flex h-16 self-center">
//// 				<TypographySmallSans className="break-words text-center text-[var(--slate-800)]">
//// 					{/* <Icon className="mb-2 inline-block max-h-[1em] min-h-[0.5em] min-w-[0.5em] max-w-[1em] text-[var(--slate-800)]" /> */}
//// 					&ensp;
//// 					{/* <a className="decoration-[var(--slate-400)] underline-offset-2 hover:underline" href="TODO"> */}
//// 					{name}
//// 					{/* </a> */}
//// 				</TypographySmallSans>
//// 			</div>
//// 		</div>
//// 	))}
//// </div>

//// <div className="flex h-16 self-center">
//// 	<TypographySmallSans className="break-words text-center text-[var(--slate-800)]">
//// 		{/* <Icon className="mb-2 inline-block max-h-[1em] min-h-[0.5em] min-w-[0.5em] max-w-[1em] text-[var(--slate-800)]" /> */}
//// 		&ensp;
//// 		{/* <a className="decoration-[var(--slate-400)] underline-offset-2 hover:underline" href="TODO"> */}
//// 		{name}
//// 		{/* </a> */}
//// 	</TypographySmallSans>
//// </div>

function GridItem({ name, icon: Icon }: { name: string; icon: IconComponent }) {
	const [hover, setHover] = useState(false)

	//// return (
	//// 	<div
	//// 		//// className="group flex w-[var(--grid-col-size)] flex-col gap-16 rounded-24 p-16 hover:bg-[var(--slate-100)]"
	//// 		className="group flex w-[var(--grid-col-size)] flex-col gap-16 rounded-24 p-16 hover:shadow-[var(--inset-hairline-shadow)]"
	//// 		onMouseEnter={e => setHover(true)}
	//// 		onMouseLeave={e => setHover(false)}
	//// 	>
	//// 		<div className="flex flex-1 items-center justify-center rounded-4 shadow-[var(--inset-hairline-shadow)] group-hover:shadow-[none]">
	//// 			<Icon className="min-h-32 min-w-32 text-[var(--slate-800)]" />
	//// 		</div>
	//// 		{hover ? (
	//// 			<div className="flex gap-6">
	//// 				<div className="flex h-32 flex-1 items-center justify-center rounded-1e3 bg-[dodgerblue] px-12 shadow-[var(--realistic-shadow-6)]">
	//// 					<TypographySmallCaps className="!font-[700] text-[white]">COPY</TypographySmallCaps>
	//// 					{/* <feather.ChevronDown
	//// 						className="m-[calc((var(--container-height)_-_var(--small-icon-height))_/_2)] mr-0 h-[var(--small-icon-height)] w-[var(--small-icon-height)] text-[white]"
	//// 						strokeWidth={4}
	//// 					/> */}
	//// 				</div>
	//// 				<div className="flex h-[var(--container-height)] w-[var(--container-height)] items-center justify-center rounded-1e3 bg-[white] shadow-[var(--inset-hairline-shadow),_var(--realistic-shadow-6)]">
	//// 					<feather.ArrowDown className="h-[var(--small-icon-height)] w-[var(--small-icon-height)] text-[var(--slate-800)]" strokeWidth={2.75} />
	//// 				</div>
	//// 			</div>
	//// 		) : (
	//// 			<div className="flex h-[var(--container-height)] self-center">
	//// 				<TypographySmallSans className="break-words text-center text-[var(--slate-800)]">
	//// 					<Icon className="mb-2 inline-block max-h-[1em] min-h-[0.5em] min-w-[0.5em] max-w-[1em] text-[var(--slate-800)]" />
	//// 					&ensp;
	//// 					{name}
	//// 				</TypographySmallSans>
	//// 			</div>
	//// 		)}
	//// 	</div>
	//// )

	return (
		//// <div className="group/card flex w-[var(--grid-col-size)] flex-col rounded-24 p-10 hover:shadow-[var(--inset-hairline-shadow)]">
		<div className="group/card flex w-[var(--grid-col-size)] flex-col rounded-28 p-12 hover:shadow-[inset_0_0_0_1px_var(--slate-200)]">
			<div className="flex flex-1 items-center justify-center rounded-4 shadow-[inset_0_0_0_1px_var(--slate-200)] group-hover/card:shadow-[none]">
				<Icon className="min-h-32 min-w-32 text-[var(--slate-800)]" />
			</div>
			{/* Must use pt-* not mt-* here */}
			<div className="flex h-40 items-end justify-center group-hover/card:hidden">
				<TypographySmallSans className="h-32 text-center !leading-[16px] text-[var(--slate-700)]">
					{/* <Icon className="mb-2 inline-block max-h-[1em] min-h-[0.5em] min-w-[0.5em] max-w-[1em] text-[var(--slate-800)]" /> */}
					{/* &ensp; */}
					{name}
				</TypographySmallSans>
			</div>
			<div className="hidden h-40 items-end gap-8 group-hover/card:flex">
				{/* <TypographySmallSans className="text-center text-[var(--slate-700)]">
					<Icon className="mb-2 inline-block max-h-[1em] min-h-[0.5em] min-w-[0.5em] max-w-[1em] text-[var(--slate-800)]" />
					&ensp;
					{name}
				</TypographySmallSans> */}
				<TypographySmallCaps className="relative flex h-32 flex-1 items-center justify-center rounded-1e3 bg-[dodgerblue] shadow-[var(--realistic-shadow-6)]">
					<div className="ml-[calc(32px_-_1.25em)] flex flex-1 justify-center !font-[700] text-[white]">COPY</div>
					{/* <div className="shadow-[-1px_0_0_0_rgb(var(--black-rgb)_/_0.25)]"> */}
					{/* <feather.ChevronDown className="m-[calc((32px_-_1.25em)_/_2)] h-[1.25em] w-[1.25em] text-[var(--white)]" strokeWidth={4} /> */}
					<feather.ChevronDown className="m-[calc((32px_-_1.25em)_/_2)] h-[1.25em] w-[1.25em] text-[rgb(var(--white-rgb)_/_0.875)]" strokeWidth={4} />
					{/* </div> */}
				</TypographySmallCaps>
				{/* <div className="flex h-32 w-32 items-center justify-center rounded-1e3 bg-[dodgerblue] shadow-[var(--realistic-shadow-6)]">
					<feather.ArrowDown className="h-12 w-12 text-[white]" strokeWidth={4} />
				</div> */}
			</div>
		</div>
	)

	return (
		//// <div className="group/card flex w-[var(--grid-col-size)] flex-col rounded-24 p-10 hover:shadow-[var(--inset-hairline-shadow)]">
		<div className="group/card flex w-[var(--grid-col-size)] flex-col rounded-28 p-12 hover:bg-[var(--slate-50)] hover:shadow-[inset_0_0_0_1px_var(--slate-200)]">
			<div className="flex flex-1 items-center justify-center rounded-4 bg-[var(--slate-50)] shadow-[inset_0_0_0_1px_var(--slate-200)] group-hover/card:shadow-[none]">
				<Icon className="min-h-32 min-w-32 text-[var(--slate-800)]" />
			</div>
			{/* Must use pt-* not mt-* here */}
			<div className="flex h-40 items-end justify-center group-hover/card:hidden">
				<TypographySmallSans className="h-32 text-center !leading-[16px] text-[var(--slate-700)]">
					{/* <Icon className="mb-2 inline-block max-h-[1em] min-h-[0.5em] min-w-[0.5em] max-w-[1em] text-[var(--slate-800)]" /> */}
					{/* &ensp; */}
					{name}
				</TypographySmallSans>
			</div>
			<div className="hidden h-40 items-end gap-8 group-hover/card:flex">
				{/* <TypographySmallSans className="text-center text-[var(--slate-700)]">
					<Icon className="mb-2 inline-block max-h-[1em] min-h-[0.5em] min-w-[0.5em] max-w-[1em] text-[var(--slate-800)]" />
					&ensp;
					{name}
				</TypographySmallSans> */}
				<TypographySmallCaps className="relative flex h-32 flex-1 items-center justify-center rounded-1e3 bg-[dodgerblue] shadow-[var(--realistic-shadow-6)]">
					<div className="ml-[calc(32px_-_1.25em)] flex flex-1 justify-center !font-[700] text-[white]">COPY</div>
					{/* <div className="shadow-[-1px_0_0_0_rgb(var(--black-rgb)_/_0.25)]"> */}
					{/* <feather.ChevronDown className="m-[calc((32px_-_1.25em)_/_2)] h-[1.25em] w-[1.25em] text-[var(--white)]" strokeWidth={4} /> */}
					<feather.ChevronDown className="m-[calc((32px_-_1.25em)_/_2)] h-[1.25em] w-[1.25em] text-[rgb(var(--white-rgb)_/_0.875)]" strokeWidth={4} />
					{/* </div> */}
				</TypographySmallCaps>
				{/* <div className="flex h-32 w-32 items-center justify-center rounded-1e3 bg-[dodgerblue] shadow-[var(--realistic-shadow-6)]">
					<feather.ArrowDown className="h-12 w-12 text-[white]" strokeWidth={4} />
				</div> */}
			</div>
		</div>
	)
}

function Main() {
	return (
		<main className="flex flex-1 flex-col gap-32 py-[var(--padding-y)] px-24">
			<div
				className="grid auto-rows-[var(--grid-row-size)] grid-cols-[repeat(auto-fill,_minmax(var(--grid-col-size),_1fr))] justify-items-center"
				style={{ "--grid-col-size": "144px", "--grid-row-size": "144px" } as CSSProperties}
			>
				{entries.map(([name, icon]) => (
					//// <GridItem key={name} name={name} icon={icon} />
					///// <div key={name} className="flex justify-center">
					<GridItem key={name} name={name} icon={icon} />
					///// </div>
				))}
			</div>
			<Hairline />
			<div className="flex flex-col gap-8">
				<LicenseItem icon={feather.Feather}>
					<span className="inline-flex items-center">
						<a className="underline decoration-[var(--slate-400)] underline-offset-2" href="TODO">
							Feather icons
						</a>
						&nbsp;designed by&nbsp;
						<a className="underline decoration-[var(--slate-400)] underline-offset-2" href="TODO">
							@colebemis
						</a>
						&ensp;
						<wkSocialMedia.Twitter className="inline-block h-[1em] w-[1em]" />
					</span>
					<br />
					Licensed as{" "}
					<a className="underline decoration-[var(--slate-400)] underline-offset-2" href="TODO">
						MIT
					</a>
					. Personal & commercial use OK <em>without</em> attribution
				</LicenseItem>
				<LicenseItem icon={p => <TheWolfKit style={{ transform: "scale(1.25)" }} {...p} />}>
					<span className="inline-flex items-center">
						<a className="underline decoration-[var(--slate-400)] underline-offset-2" href="TODO">
							Social and payment processsor icons
						</a>
						&nbsp;from&nbsp;
						<a className="underline decoration-[var(--slate-400)] underline-offset-2" href="TODO">
							The Wolf Kit
						</a>
						&ensp;
						<wkSocialMedia.Figma className="inline-block h-[1em] w-[1em]" />
					</span>
					<br />
					Licensed as{" "}
					<a className="underline decoration-[var(--slate-400)] underline-offset-2" href="TODO">
						CC BY 4.0
					</a>
					. Personal & commercial use OK <em>with</em> attribution
				</LicenseItem>
				{/* <LicenseItem icon={p => <TheWolfKit style={{ transform: "scale(1.25)" }} {...p} />}>
						<span className="inline-flex items-center">
							<a className="underline decoration-[var(--slate-400)] underline-offset-2" href="TODO">
								Payment processor icons
							</a>
							&nbsp;from&nbsp;
							<a className="underline decoration-[var(--slate-400)] underline-offset-2" href="TODO">
								The Wolf Kit
							</a>
							&ensp;
							<wkSocialMedia.Figma className="inline-block h-[1em] w-[1em]" />
						</span>
						<br />
						Licensed as{" "}
						<a className="underline decoration-[var(--slate-400)] underline-offset-2" href="TODO">
							CC BY 4.0
						</a>
						. Personal & commercial use OK <em>with</em> attribution
					</LicenseItem> */}
			</div>
			{/* </Fieldset> */}
		</main>
	)
}

////////////////////////////////////////////////////////////////////////////////

function DebugCss() {
	const [showOutline, setShowOutline] = useState(false)

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "`") {
				setShowOutline(curr => !curr)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	return <>{showOutline && <style>{`*:not(svg *) { outline: 1px solid hsl(0, 100%, 50%, 0.125); }`}</style>}</>
}

export function App() {
	return (
		<>
			<DebugCss />
			<Aside />
			<Main />
			{/* <div className="w-[352px] bg-[var(--slate-50)] shadow-[var(--hairline-l-shadow)]"></div> */}
			<div className="bg-white fixed right-32 bottom-32 h-288 w-448 rounded-32 bg-[white] shadow-[var(--hairline-shadow),_var(--realistic-shadow-6)]">
				<div>Hello</div>
			</div>
		</>
	)
}
