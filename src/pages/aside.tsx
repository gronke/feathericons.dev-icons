import * as feather from "../data/react-feather"

import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { MouseEventHandler, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { IThemedToken } from "shiki-es"
import { AriaCheckbox, AriaCheckboxProps } from "../aria/aria-checkbox"
import { AriaSimpleDropDown, AriaSimpleDropDownItem, AriaSimpleDropDownItemProps } from "../aria/aria-simple-dropdown"
import { AriaSlider, AriaSliderProps } from "../aria/aria-slider"
import { AdjustableIcon } from "../components/adjustable-icon"
import { ReactJsHex, ReactJsIcon, SvgHex, SvgIcon, TypeScriptHex, TypeScriptIcon } from "../components/icons"
import { PageTransition } from "../components/page-transition"
import { TypographyCaps } from "../components/typography"
import {
	FormatAs,
	sizeInitial,
	sizeMax,
	sizeMin,
	sizeStep,
	strokeWidthInitial,
	strokeWidthMax,
	strokeWidthMin,
	strokeWidthStep,
} from "../constants"
import { manifest } from "../data/react-feather-manifest"
import { toKebabCase, toTitleCase } from "../lib/cases"
import { download } from "../lib/download"
import { Icon, SVG } from "../lib/react/icon"
import { Mutable } from "../lib/types"
import { ShikiContext } from "../providers/shiki"
import { SelectedContext, SliderContext } from "../providers/state"

function CommentLink({ formatAs, children }: { formatAs: FormatAs; children: string }) {
	if (formatAs === "svg") {
		const href = children.slice("<!-- ".length, -1 * " -->".length)
		return (
			<>
				{"<!-- "}
				<a href={href} target="_blank" rel="noreferrer" className="underline">
					{href}
				</a>{" "}
				✨ {"--> "}
			</>
		)
	} else {
		const href = children.slice("// ".length)
		return (
			<>
				{"// "}
				<a href={href} target="_blank" rel="noreferrer" className="underline">
					{href}
				</a>{" "}
				✨{" "}
			</>
		)
	}
}

// TODO
function useRouterName() {
	const router = useRouter()
	let name: keyof typeof manifest
	if (router.query.icon === undefined) {
		name = "Feather"
	} else {
		// Cast string | string[] to string and string to keyof typeof manifest
		name = toTitleCase(router.query.icon as string) as keyof typeof manifest
	}
	return name
}

function Preview() {
	const name = useRouterName()

	const { highlighter } = useContext(ShikiContext)!
	const { viewSource, formatAs, clipboard: code } = useContext(SelectedContext)!

	const [tokens, setTokens] = useState<IThemedToken[][] | null>(null)

	useEffect(() => {
		if (highlighter === null) { return } // prettier-ignore
		const tokens = highlighter.codeToThemedTokens(code + "\n", formatAs === "svg" ? "html" : "tsx", "github-light")
		setTokens(tokens)
	}, [code, formatAs, highlighter])

	return viewSource ? (
		<pre className="aspect-[1.5] overflow-auto rounded-24 bg-white text-gray-800 shadow-[var(--shadow-2)]">
			<code className="inline-block py-24 text-[13px] leading-[1.5]">
				{tokens === null
					? code.split("\n").map((ys, y) => (
							<div key={y} className="px-24">
								{ys.length > 0 ? y === 0 ? <CommentLink formatAs={formatAs}>{ys}</CommentLink> : ys : <br />}
							</div>
					  ))
					: tokens.map((ys, y) => (
							<div key={y} className="px-24">
								{ys.length > 0 ? (
									ys.map(({ color, content }, x) => (
										<span key={x} style={{ color }}>
											{y === 0 ? <CommentLink formatAs={formatAs}>{content}</CommentLink> : content}
										</span>
									))
								) : (
									<br />
								)}
							</div>
					  ))}
			</code>
		</pre>
	) : (
		// FIXME: Lol what the hell is going on here?
		<div>
			<div
				className="flex aspect-[1.5] items-center justify-center rounded-24 bg-white shadow-[var(--shadow-2)]"
				data-background-dots
			>
				<PageTransition>
					{/* Use <div> to preserve <AdjustableIcon> */}
					<div>
						<AdjustableIcon className="h-64 w-64 text-black" icon={feather[name]} />
					</div>
				</PageTransition>
			</div>
		</div>
	)
}

////////////////////////////////////////////////////////////////////////////////

function DropDownItem({ id, children, ...props }: AriaSimpleDropDownItemProps<FormatAs>) {
	return (
		<AriaSimpleDropDownItem
			id={id}
			className="flex h-[var(--form-size)] items-center gap-8 px-16
				hover:bg-gray-100
					hover:active:bg-gray-200
						aria-selected:bg-gray-100"
			{...props}
		>
			{children}
		</AriaSimpleDropDownItem>
	)
}

function FormatButton() {
	const { formatAs, setFormatAs } = useContext(SelectedContext)!

	const ref = useRef<HTMLDivElement | null>(null)
	const [show, setShow] = useState(false)

	const [hex, icon, desc] = useMemo(() => {
		return {
			svg: [SvgHex, SvgIcon, "SVG"] as const,
			jsx: [ReactJsHex, ReactJsIcon, "JSX"] as const,
			tsx: [TypeScriptHex, TypeScriptIcon, "TSX"] as const,
		}[formatAs as Mutable<FormatAs>]
	}, [formatAs])

	return (
		<AriaSimpleDropDown<FormatAs>
			className="relative flex flex-col"
			show={show}
			setShow={setShow}
			currentId={formatAs}
			setCurrentId={setFormatAs}
			aria-label="Click to format as SVG, JSX, or TSX"
		>
			<div className="relative flex flex-col">
				{/* group/button */}
				<div
					className="group/button flex h-[var(--form-size)] items-center justify-center rounded-1e3 bg-white shadow-[var(--shadow-2)]
						hover:active:bg-gray-200 hover:active:shadow-[var(--inset-shadow-2)]"
				>
					<div className="-ml-[calc((var(--form-size)_-_16px)_/_2)] flex h-[var(--form-size)] w-[var(--form-size)] items-center justify-center">
						<Icon
							className="h-16 w-16 group-hover/button:group-active/button:text-white"
							style={{ color: hex }}
							icon={icon}
						/>
					</div>
					<TypographyCaps className="text-gray-700">
						FILE FORMAT: <span className="inline-flex h-0 w-24">{desc}</span>
					</TypographyCaps>
				</div>
				<div className="absolute top-0 right-0 bottom-0">
					<div className="flex h-[var(--form-size)] w-[calc(var(--form-size)_+_var(--form-size)_/_4)] items-center justify-center">
						<Icon className="h-16 w-16 text-gray-500" icon={feather.ChevronDown} />
					</div>
				</div>
			</div>
			<AnimatePresence>
				{show && (
					<motion.div
						initial={{
							y: -8,
							opacity: 0,
						}}
						animate={{
							y: 0,
							opacity: 1,
						}}
						exit={{
							y: -8,
							opacity: 0,
						}}
						transition={{
							duration: 0.1,
							ease: [0, 1, 1, 1],
						}}
						className="absolute top-[calc(100%_+_8px)] right-0 z-10"
					>
						<div
							ref={ref}
							className="flex flex-col overflow-hidden rounded-12 bg-white shadow-[var(--shadow-6),_var(--base-shadow-6)]"
						>
							<DropDownItem
								// prettier-ignore
								id="svg"
								aria-label="Format as SVG"
							>
								<Icon className="h-16 w-16" style={{ color: SvgHex }} icon={SvgIcon} />
								<TypographyCaps className="text-gray-700">SVG</TypographyCaps>
							</DropDownItem>
							<DropDownItem
								// prettier-ignore
								id="jsx"
								aria-label="Format as React"
							>
								<Icon className="h-16 w-16" style={{ color: ReactJsHex }} icon={ReactJsIcon} />
								<TypographyCaps className="text-gray-700">REACT</TypographyCaps>
							</DropDownItem>
							<DropDownItem
								// prettier-ignore
								id="tsx"
								aria-label="Format as TypeScript React"
							>
								<Icon className="h-16 w-16" style={{ color: TypeScriptHex }} icon={TypeScriptIcon} />
								<TypographyCaps className="text-gray-700">TS REACT</TypographyCaps>
							</DropDownItem>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</AriaSimpleDropDown>
	)
}

function ActionButton({ icon, onClick, children, ...props }: { icon: SVG } & JSX.IntrinsicElements["button"]) {
	const [pressed, setPressed] = useState(false)

	useEffect(() => {
		if (!pressed) { return } // prettier-ignore
		const d = window.setTimeout(() => {
			setPressed(false)
		}, 1e3)
		return () => window.clearTimeout(d)
	}, [pressed])

	return (
		// group/button
		<button
			className="group/button flex h-[var(--form-size)] items-center justify-center rounded-1e3 bg-white shadow-[var(--shadow-2)]
				hover:active:bg-[var(--theme-color)] hover:active:shadow-[var(--inset-shadow-2)]"
			onClick={e => {
				setPressed(true)
				onClick?.(e)
			}}
			{...props}
		>
			<div className="-ml-[calc((var(--form-size)_-_16px)_/_2)] flex h-[var(--form-size)] w-[var(--form-size)] items-center justify-center">
				<Icon
					className="h-16 w-16 text-[var(--theme-color)] group-hover/button:group-active/button:text-white"
					icon={pressed ? feather.Check : icon}
				/>
			</div>
			<TypographyCaps className="text-gray-700 group-hover/button:group-active/button:text-white">
				{children}
			</TypographyCaps>
		</button>
	)
}

////////////////////////////////////////////////////////////////////////////////

function DecorativeIcon({ icon }: { icon: SVG }) {
	return (
		<div className="flex h-24 w-24 items-center justify-center rounded-1e3 bg-gray-200">
			<Icon className="h-12 w-12 text-gray-700" icon={icon} />
		</div>
	)
}

function CompoundCheckbox({ children, ...props }: AriaCheckboxProps) {
	return (
		<AriaCheckbox className="group/checkbox flex h-24 items-center justify-between" {...props}>
			{/* LHS */}
			<div className="flex items-center gap-8">
				<DecorativeIcon icon={feather.Code} />
				<TypographyCaps className="text-gray-700">{children}</TypographyCaps>
			</div>
			{/* RHS */}
			<div className="flex h-16 w-48 items-center rounded-1e3 bg-[var(--hairline-color)] group-aria-checked/checkbox:bg-[var(--theme-color)]">
				<motion.div
					animate={{ x: props.checked ? "50%" : 0 }}
					transition={{
						duration: 0.075,
						ease: [0, 1, 1, 1],
					}}
					className="h-[var(--reduced-form-size)] w-[var(--reduced-form-size)] rounded-1e3 bg-white shadow-[var(--shadow-6)]"
				></motion.div>
			</div>
		</AriaCheckbox>
	)
}

const linearGradientFromHell =
	"bg-[linear-gradient(to_right,_var(--theme-color)_calc(var(--progress,_0.5)_*_100%),_var(--hairline-color)_calc(var(--progress,_0.5)_*_100%))]"

//// function useMedia(query: string, initialValue: boolean) {
//// 	const [state, setState] = useState(initialValue)
////
//// 	useEffect(() => {
//// 		const media = window.matchMedia(query)
//// 		function handleChange(e: MediaQueryListEvent) {
//// 			setState(e.matches)
//// 		}
//// 		media.addEventListener("change", handleChange)
//// 		return () => media.removeEventListener("change", handleChange)
//// 	}, [query])
////
//// 	return state
//// }

function CompoundSlider({
	icon,
	resetHandler,
	children,
	...props
}: { icon: SVG } & { resetHandler: MouseEventHandler } & Omit<AriaSliderProps, "track" | "thumb">) {
	const [track, setTrack] = useState<HTMLDivElement | null>(null)
	const [thumb, setThumb] = useState<HTMLDivElement | null>(null)

	return (
		<>
			<div className="flex h-24 items-center justify-between">
				{/* LHS */}
				<div className="flex items-center gap-8">
					<DecorativeIcon icon={icon} />
					<TypographyCaps className="text-gray-700">{children}</TypographyCaps>
				</div>
				{/* RHS */}
				<div className="flex items-center gap-8">
					{/* prettier-ignore */}
					<TypographyCaps className="text-gray-700">
						{props.value < sizeMin
							? props.value.toFixed(2)
							: `${props.value} PX`}
					</TypographyCaps>
					<button
						className="flex h-24 w-24 items-center justify-center"
						onClick={resetHandler}
						aria-label={`Reset ${props.value < sizeMin ? "stroke-width" : "size"}`}
					>
						<Icon className="h-16 w-16 text-gray-300 [button:hover_&]:text-gray-700" icon={feather.RotateCcw} />
					</button>
				</div>
			</div>
			<div className="px-12">
				<AriaSlider track={track} thumb={thumb} {...props}>
					<div ref={setTrack} className="flex h-24 flex-col justify-center">
						<div className={`flex h-6 items-center rounded-1e3 ${linearGradientFromHell}`}>
							<div
								ref={setThumb}
								className="h-[var(--form-size)] w-[var(--form-size)] rounded-1e3 bg-white shadow-[var(--shadow-6)]"
								// Statically determine the width and then translateX to center
								// before <AriaSlider> mounts
								style={{
									transform:
										"translateX(calc((var(--aside-w) - var(--aside-inset-x) * 2 - 12px * 2) / 2 - var(--form-size) / 2))",
								}}
							></div>
						</div>
					</div>
				</AriaSlider>
			</div>
		</>
	)
}

////////////////////////////////////////////////////////////////////////////////

function Section({ children, ...props }: JSX.IntrinsicElements["section"]) {
	return (
		<section className="flex flex-col gap-16 px-24" {...props}>
			{children}
		</section>
	)
}

////////////////////////////////////////////////////////////////////////////////

export function Aside() {
	const { selectedName, viewSource, setViewSource, formatAs, clipboard } = useContext(SelectedContext)!
	const { size, setSize, strokeWidth, setStrokeWidth } = useContext(SliderContext)!

	const handleClickCopy = useCallback(() => {
		async function fn() {
			await navigator.clipboard.writeText(clipboard)
		}
		fn()
	}, [clipboard])

	const handleClickDownload = useCallback(() => {
		const filename = `${formatAs === "svg" ? toKebabCase(selectedName) : selectedName}.${formatAs}`
		const contents = clipboard + "\n"
		download(filename, contents)
	}, [clipboard, formatAs, selectedName])

	return (
		<div className="flex flex-col gap-16 py-24">
			<Section>
				<CompoundCheckbox checked={viewSource} setChecked={setViewSource}>
					VIEW SOURCE
				</CompoundCheckbox>
			</Section>
			<Section>
				<Preview />
			</Section>
			<Section>
				<div className="flex flex-col gap-8">
					<FormatButton />
					<div className="grid grid-cols-2 gap-8">
						<ActionButton
							icon={feather.Clipboard}
							onClick={handleClickCopy}
							aria-label={`Copy ${selectedName} as ${formatAs.toUpperCase()} to the clipboard`}
						>
							COPY
						</ActionButton>
						<ActionButton
							icon={feather.Download}
							onClick={handleClickDownload}
							aria-label={`Download ${selectedName} as ${formatAs.toUpperCase()}`}
						>
							DOWNLOAD
						</ActionButton>
					</div>
				</div>
			</Section>
			<hr />
			<Section>
				<CompoundSlider
					icon={feather.Maximize2}
					min={sizeMin}
					max={sizeMax}
					step={sizeStep}
					value={size}
					setValue={setSize}
					resetHandler={e => setSize(sizeInitial)}
					aria-label="Preview size"
				>
					PREVIEW SIZE
				</CompoundSlider>
			</Section>
			<hr />
			<Section>
				<CompoundSlider
					icon={feather.Minimize2}
					min={strokeWidthMin}
					max={strokeWidthMax}
					step={strokeWidthStep}
					value={strokeWidth}
					setValue={setStrokeWidth}
					resetHandler={e => setStrokeWidth(strokeWidthInitial)}
					aria-label="Preview stroke-width"
				>
					PREVIEW STROKE WIDTH
				</CompoundSlider>
			</Section>
		</div>
	)
}
