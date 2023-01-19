import "./search-app.scss"

import * as feather from "./data/react-feather@4.29.0"

//// import featherZip from "./data/feather@4.29.0.zip?url"

import { ButtonHTMLAttributes, Dispatch, Fragment, PropsWithChildren, ReactNode, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { AriaCheckbox } from "./aria/aria-checkbox"
import { AriaSlider } from "./aria/aria-slider"
import { sizeInitial, sizeMax, sizeMin, sizeStep, strokeWidthInitial, strokeWidthMax, strokeWidthMin, strokeWidthStep } from "./constants"
import { manifest } from "./data/react-feather-manifest@4.29.0"
import { JSXIcon, SVGIcon, TSXIcon } from "./icon-config"
import { toKebabCase } from "./lib/cases"
import { cx } from "./lib/cx"
import { download } from "./lib/download"
import { Icon, IconComponent } from "./lib/react/icon"
import { SearchContext, SelectedContext, SliderContext, StateProvider } from "./state"
import { Transition } from "./transition"
import { TypeCaps } from "./typography"

type Position = "start" | "center" | "end"

function Tooltip({ pos, icon, text, children }: PropsWithChildren<{ pos: Position, icon?: IconComponent, text: ReactNode, data?: any }>) {
	const [hover, setHover] = useState(false)

	return <>
		{/* Use flex flex-col to preserve width */}
		<div className="relative flex flex-col" onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)}>
			{children}
			<Transition
				when={hover}
				unmount="start"
				start={{
					transform: pos === "center"
						? "translateY(8px) translateX(-50%)"
						: "translateY(8px)",
					opacity: 0,
				}}
				end={{
					transform: pos === "center"
						? "translateY(0px) translateX(-50%)"
						: "translateY(0px)",
					opacity: 1,
				}}
				duration={100}
				ease={[0, 1, 1, 1]}
				delay={hover ? 10 : 0}
			>
				<div className={{
					"start":  cx("absolute t-(100%_+_10px) l-0   z-10 pointer-events--none"),
					"center": cx("absolute t-(100%_+_10px) l-50% z-10 pointer-events--none"),
					"end":    cx("absolute t-(100%_+_10px) r-0   z-10 pointer-events--none"),
				}[pos]}>
					<div className="px-12 flex align-center gap-8 h-32 rounded-12 background-color--hsl(0,_0%,_99%) box-shadow--$shadow-6,_$raw-shadow-6">
						{icon !== undefined && <Icon className="h-16 w-16 color--#333" icon={icon} />}
						<TypeCaps>
							{text}
						</TypeCaps>
					</div>
				</div>
			</Transition>
		</div>
	</>
}

function SearchBarButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	return <>
		<button className="px-8 flex align-center h-$search-bar-height" {...props}>
			<div className="flex center h-32 w-32 rounded-1e3 background-color--pink">
				<div className="h-16 w-16 rounded-1e3 background-color--red"></div>
			</div>
		</button>
	</>
}

export function SearchBar() {
	const { setCompactMode, search, setSearch } = useContext(SearchContext)!

	const ref = useRef<HTMLInputElement | null>(null)

	return <>
		<div className="px-8 flex align-center h-64 rounded-1e3 background-color--#fff box-shadow--$shadow-2 [&_>_:nth-child(2)]:flex-grow--1">
			<Tooltip pos="start" text={<>SEARCH FEATHER</>}>
				<SearchBarButton onClick={e => ref.current!.select()} />
			</Tooltip>
			<input
				ref={ref}
				className="px-8 h-$search-bar-height"
				type="text"
				value={search}
				onChange={e => setSearch(e.currentTarget.value)}
				//// onKeyDown={e => {
				//// 	if (e.key === "ArrowUp") {
				//// 		e.preventDefault()
				//// 		restoreSearch(-1)
				//// 	} else if (e.key === "ArrowDown") {
				//// 		e.preventDefault()
				//// 		restoreSearch(+1)
				//// 	}
				//// }}
				autoFocus
			/>
			<Tooltip pos="end" text={<>COMPACT MODE</>}>
				<SearchBarButton onClick={e => setCompactMode(curr => !curr)} />
			</Tooltip>
			{/* <Tooltip pos="end" text={<>TOGGLE THEME</>}>
				<SearchBarButton />
			</Tooltip> */}
		</div>
	</>
}

function Wbr({ children }: { children: string }) {
	const parts = children.split(/(?=[A-Z])/)
	return <>
		{parts.map((part, index) => <Fragment key={part}>
			{index > 0 && <wbr />}
			{part}
		</Fragment>)}
	</>
}

function Highlight({ indexes, children }: { indexes: readonly [number, number] | null, children: string }) {
	if (indexes === null) {
		return <Wbr>{children}</Wbr>
	} else {
		return <>
			<Wbr>{children.slice(0, indexes[0])}</Wbr>
			<span className="background-color--hsl(45,_100%,_90%) box-shadow--0_1px_0_0_hsl(45,_100%,_60%)">
				<Wbr>{children.slice(indexes[0], indexes[1])}</Wbr>
			</span>
			<Wbr>{children.slice(indexes[1])}</Wbr>
		</>
	}
}

export function SearchResultsContents() {
	const { compactMode, searchResults } = useContext(SearchContext)!
	const { setSelectedName, setSelectedSvgElement: setSelectedIcon } = useContext(SelectedContext)!

	return <>
		<div className="grid grid-cols-repeat(auto-fill,_minmax(96px,_1fr))">
			{compactMode ? <>
				{Object.keys(searchResults).map(name => <Fragment key={name}>
					<button className="flex flex-col" onClick={e => {
						setSelectedName(name as keyof typeof manifest)
						setSelectedIcon(document.getElementById(name)! as unknown as SVGSVGElement)
					}}>
						<Tooltip pos="center" icon={feather[name as keyof typeof feather]} text={toKebabCase(name).toUpperCase()}>
							<div className="flex center h-96">
								<Icon id={name} className="h-32 w-32 transform--scale($scale) stroke-width--$stroke-width color--#333" icon={feather[name as keyof typeof feather]} />
							</div>
						</Tooltip>
					</button>
				</Fragment>)}
			</> : <>
				{Object.keys(searchResults).map(name => <Fragment key={name}>
					<button className="flex flex-col" onClick={e => {
						setSelectedName(name as keyof typeof manifest)
						setSelectedIcon(document.getElementById(name)! as unknown as SVGSVGElement)
					}}>
						<div className="flex center h-96">
							<Icon id={name} className="h-32 w-32 transform--scale($scale) stroke-width--$stroke-width color--#333" icon={feather[name as keyof typeof feather]} />
						</div>
						{/* TODO: Extract typography? */}
						{/* FIXME */}
						<div className="px-4 flex center h-64 -webkit-user-select--all user-select--all">
							<div className="h-32 text-align--center font--400_12px_/_normal_$sans color--#333">
								<Highlight indexes={searchResults[name as keyof typeof feather]!}>
									{name}
								</Highlight>
							</div>
						</div>
					</button>
				</Fragment>)}
			</>}
		</div>
	</>
}

function Hairline() {
	return <hr className="h-$hairline-height background-color--$hairline-color" />
}

function Checkbox({ checked, setChecked, children }: PropsWithChildren<{ checked: boolean, setChecked: Dispatch<SetStateAction<boolean>> }>) {
	return <>
		<AriaCheckbox className="flex justify-between align-center h-$sidebar-label-height" checked={checked} setChecked={setChecked}>
			{children}
			<div className="flex flex-col justify-center h-$sidebar-label-height">
				<Transition
					when={checked}
					start={{ backgroundColor: "var(--hairline-color)" }}
					  end={{ backgroundColor: "var(--alt-trim-color)" }}
					duration={50}
					ease={[0, 1, 1, 1.25]}
				>
					<div className="flex align-center h-12 w-48 rounded-1e3">
						<Transition
							when={checked}
							start={{ transform: "translateX(0%)"  }}
							  end={{ transform: "translateX(50%)" }}
							duration={50}
							ease={[0, 1, 1, 1.25]}
						>
							<div className="h-$sidebar-input-height w-$sidebar-input-height rounded-1e3 background-color--#ffff box-shadow--$shadow-6"></div>
						</Transition>
					</div>
				</Transition>
			</div>
		</AriaCheckbox>
	</>
}

function Slider(props: {
	min:      number
	max:      number
	step:     number
	value:    number
	setValue: Dispatch<SetStateAction<number>>
}) {
	const [track, setTrack] = useState<HTMLDivElement | null>(null)
	const [thumb, setThumb] = useState<HTMLDivElement | null>(null)

	return <>
		<AriaSlider track={track} thumb={thumb} {...props}>
			<div className="px-8">
				<div ref={setTrack} className="flex flex-col justify-center h-$sidebar-label-height">
					<div className="flex align-center h-6 rounded-1e3 background-image--linear-gradient(to_right,_$alt-trim-color_calc($progress_*_100%),_$hairline-color_calc($progress_*_100%))">
						<div ref={setThumb} className="h-($sidebar-input-height_+_4px) w-($sidebar-input-height_+_4px) rounded-1e3 background-color--#fff box-shadow--$shadow-6"></div>
					</div>
				</div>
			</div>
		</AriaSlider>
	</>
}

function CopyButton({ onPointerUp, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	const [pressed, setPressed] = useState(false)

	useEffect(() => {
		if (!pressed) { return }
		const d = window.setTimeout(() => {
			setPressed(false)
		}, 500)
		return () => window.clearTimeout(d)
	}, [pressed])

	return <>
		<button
			className={cx(`px-16 flex center gap-8 h-32 rounded-12 background-color--#fff box-shadow--$shadow-2
				[&:hover:active]:background-color--$alt-trim-color [&:hover:active_*]:color--#fff`)}
			onPointerUp={e => {
				setPressed(true)
				onPointerUp?.(e)
			}}
			{...props}
		>
			<Icon
				className="h-16 w-16 color--$alt-trim-color"
				icon={pressed ? feather.Check : feather.Clipboard}
				strokeWidth={pressed ? 3 : 2.5}
			/>
			<TypeCaps>
				COPY
			</TypeCaps>
		</button>
	</>
}

function DownloadButton({ onPointerUp, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	const [pressed, setPressed] = useState(false)

	// TODO: Add esc button support
	useEffect(() => {
		if (!pressed) { return }
		const d = window.setTimeout(() => {
			setPressed(false)
		}, 500)
		return () => window.clearTimeout(d)
	}, [pressed])

	return <>
		<button
			className={cx(`px-16 flex center gap-8 h-32 rounded-12 background-color--#fff box-shadow--$shadow-2
				[&:hover:active]:background-color--$alt-trim-color [&:hover:active_*]:color--#fff`)}
			onPointerUp={e => {
				setPressed(true)
				onPointerUp?.(e)
			}}
			{...props}
		>
			<Icon
				className="h-16 w-16 color--$alt-trim-color"
				icon={pressed ? feather.Check : feather.Download}
				strokeWidth={pressed ? 3 : 2.5}
			/>
			<TypeCaps>
				DOWNLOAD
			</TypeCaps>
		</button>
	</>
}

function FormatButton() {
	const { formatAs, setFormatAs } = useContext(SelectedContext)!

	const ref = useRef<HTMLDivElement | null>(null)
	const [show, setShow] = useState(false)

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (ref.current === null) { return }
			if (!(e.target instanceof HTMLElement && ref.current.contains(e.target))) {
				setShow(false)
			}
		}
		window.addEventListener("click", handleClick, false)
		return () => window.removeEventListener("click", handleClick, false)
	}, [])

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setShow(false)
			}
		}
		window.addEventListener("keydown", handleKeyDown, false)
		return () => window.removeEventListener("keydown", handleKeyDown, false)
	}, [])

	return <>
		<div className="relative flex flex-col">
			<div className="relative flex flex-col">
				<button className="px-16 flex center gap-8 h-32 rounded-12 background-color--#fff box-shadow--$shadow-2" onClick={e => setShow(curr => !curr)}>
					<Icon className={cx(`h-16 w-16  ${{
						svg: "color--$svg-color",
						jsx: "color--$jsx-color",
						tsx: "color--$tsx-color",
					}[formatAs]}`)} icon={{
						"svg": SVGIcon,
						"jsx": JSXIcon,
						"tsx": TSXIcon,
					}[formatAs]} strokeWidth={2.5} />
					<TypeCaps>
						FORMAT AS{" "}
						{{
							"svg": "SVG",
							"jsx": "REACT",
							"tsx": "TS REACT",
						}[formatAs]}
					</TypeCaps>
					<div className="absolute inset-r-0">
						<div className="flex center h-32 w-32 rounded-1e3">
							<Icon className="h-16 w-16 color--#555" icon={feather.ChevronDown} strokeWidth={2.5} />
						</div>
					</div>
				</button>
			</div>
			<Transition
				when={show}
				unmount="start"
				start={{
					transform: "translateY(-8px)",
					opacity: 0,
				}}
				end={{
					transform: "translateY(0px)",
					opacity: 1,
				}}
				duration={100}
				ease={[0, 1, 1, 1]}
			>
				<div ref={ref} className="absolute t-(100%_+_10px) r-0 z-10">
					<div className="flex flex-col rounded-12 background-color--hsl(0,_0%,_99%) box-shadow--$shadow-6">
						<button
							className="px-12 flex align-center gap-8 h-32 [&:first-child]:rounded-t-12 [&:last-child]:rounded-b-12 [&:hover]:background-color--hsl($base-h,_$base-s,_$base-l,_0.1)"
							onClick={e => {
								setFormatAs("svg")
								setShow(false)
							}}
						>
							<Icon className="h-16 w-16 color--$svg-color" icon={SVGIcon} />
							<TypeCaps>
								SVG
							</TypeCaps>
						</button>
						<button
							className="px-12 flex align-center gap-8 h-32 [&:first-child]:rounded-t-12 [&:last-child]:rounded-b-12 [&:hover]:background-color--hsl($base-h,_$base-s,_$base-l,_0.1)"
							onClick={e => {
								setFormatAs("jsx")
								setShow(false)
							}}
						>
							<Icon className="h-16 w-16 color--$jsx-color" icon={JSXIcon} />
							<TypeCaps>
								REACT
							</TypeCaps>
						</button>
						<button
							className="px-12 flex align-center gap-8 h-32 [&:first-child]:rounded-t-12 [&:last-child]:rounded-b-12 [&:hover]:background-color--hsl($base-h,_$base-s,_$base-l,_0.1)"
							onClick={e => {
								setFormatAs("tsx")
								setShow(false)
							}}
						>
							<Icon className="h-16 w-16 color--$tsx-color" icon={TSXIcon} />
							<TypeCaps>
								TS REACT
							</TypeCaps>
						</button>
					</div>
				</div>
			</Transition>
		</div>
	</>
}

export function SidebarContents() {
	const { selectedName, viewSource, setViewSource, formatAs, clipboard } = useContext(SelectedContext)!
	const { size, setSize, strokeWidth, setStrokeWidth } = useContext(SliderContext)!

	const [value, setValue] = useState(clipboard)

	useEffect(() => {
		setValue(clipboard)
	}, [clipboard])

	return <>
		<Checkbox checked={viewSource} setChecked={setViewSource}>
			<div className="flex align-center gap-10">
				<div className="flex center h-24 w-24 rounded-43.75% background-color--hsl($base-h,_$base-s,_$base-l,_0.125)">
					<Icon className="h-12 w-12 color--#333" icon={feather.Code} />
				</div>
				<TypeCaps>
					VIEW SOURCE
				</TypeCaps>
			</div>
		</Checkbox>
		{viewSource ? <>
			<textarea
				className={cx(`
					p-24 rounded-24 background-color--#fff box-shadow--$shadow-2

					white-space--pre
					font--400_14px_/_normal_$code
					font-feature-settings--'tnum'
					letter-spacing--null
					color--#333
				`)}
				value={value}
				onChange={e => setValue(e.currentTarget.value)}
				rows={clipboard.split("\n").length}
			/>
		</> : <>
			<div
				//// className="flex center aspect-1.5 rounded-24 background-color--#fff box-shadow--$shadow-2"
				className="flex center aspect-1.5 rounded-24 background-color--#fff box-shadow--$shadow-2"
				style={viewSource ? undefined : {
					// https://30secondsofcode.org/css/s/polka-dot-pattern
					backgroundImage:    "radial-gradient(hsl(0, 0%, 75%) 0%, transparent 10%), radial-gradient(hsl(0, 0%, 75%) 0%, transparent 10%)",
					backgroundPosition: "center calc(320px / 2 - (32px + 10px + 32px) / 2)",
					backgroundSize:     "calc(16px * var(--scale)) calc(16px * var(--scale))",
				}}
			>
				{/* [transform] takes precedence to [stroke-width] here */}
				<Icon className="h-64 w-64 transform--scale($scale) stroke-width--$stroke-width color--#333" icon={feather[selectedName]} />
			</div>
		</>}
		<div className="flex flex-col gap-10">
			<FormatButton />
			<div className="grid grid-cols-2 gap-10">
				<CopyButton onClick={async e => {
					await navigator.clipboard.writeText(clipboard)
				}} />
				<DownloadButton onClick={e => {
					const filename = `${formatAs === "svg"
						? toKebabCase(selectedName)
						: selectedName
					}.${formatAs}`
					const contents = clipboard + "\n"
					download(filename, contents)
				}} />
			</div>
		</div>
		<Hairline />
		<div className="flex justify-between align-center h-$sidebar-label-height">
			<div className="flex align-center gap-10">
				{/* <Icon className="h-16 w-16 color--#ccc" icon={feather.Maximize2} /> */}
				<div className="flex center h-24 w-24 rounded-43.75% background-color--hsl($base-h,_$base-s,_$base-l,_0.125)">
					<Icon className="h-12 w-12 color--#333" icon={feather.Maximize2} />
				</div>
				<TypeCaps>
					PREVIEW SIZE
				</TypeCaps>
			</div>
			<div className="flex align-center gap-8">
				<TypeCaps>
					{size} PX
				</TypeCaps>
				<button className="flex center" onClick={e => setSize(sizeInitial)}>
					<Icon className="h-16 w-16 color--#ccc [&:hover]:color--#333" icon={feather.RotateCcw} strokeWidth={2.5} onClick={e => setSize(sizeInitial)} />
				</button>
			</div>
		</div>
		<Slider min={sizeMin} max={sizeMax} step={sizeStep} value={size} setValue={setSize} />
		<Hairline />
		<div className="flex justify-between align-center h-$sidebar-label-height">
			<div className="flex align-center gap-10">
				{/* <Icon className="h-16 w-16 color--#ccc" icon={feather.Minimize2} /> */}
				<div className="flex center h-24 w-24 rounded-43.75% background-color--hsl($base-h,_$base-s,_$base-l,_0.125)">
					<Icon className="h-12 w-12 color--#333" icon={feather.Minimize2} />
				</div>
				<TypeCaps>
					PREVIEW STROKE WIDTH
				</TypeCaps>
			</div>
			<div className="flex align-center gap-8">
				<TypeCaps>
					{strokeWidth.toFixed(2)}
				</TypeCaps>
				<button className="flex center" onClick={e => setStrokeWidth(strokeWidthInitial)}>
					<Icon className="h-16 w-16 color--#ccc [&:hover]:color--#333" icon={feather.RotateCcw} strokeWidth={2.5} onClick={e => setStrokeWidth(strokeWidthInitial)} />
				</button>
			</div>
		</div>
		<Slider min={strokeWidthMin} max={strokeWidthMax} step={strokeWidthStep} value={strokeWidth} setValue={setStrokeWidth} />
	</>
}

// TODO
document.documentElement.style.backgroundColor = "#fff"

// TODO: DEPRECATE
function App() {
	return <>
		{/* <a href={featherZip} download>
			Click me
		</a> */}
		<div className="p-32 flex justify-center">
			<div className="flex-basis--2e3px flex gap-64 [&_>_:nth-child(1)]:flex-grow--1">
				<div className="flex flex-col gap-64">
					<SearchBar />
					<SearchResultsContents />
				</div>
				<div className="flex flex-col gap-20 w-384">
					<SidebarContents />
				</div>
			</div>
		</div>
	</>
}

export function ProvidedApp() {
	return <>
		<StateProvider>
			<App />
		</StateProvider>
	</>
}
