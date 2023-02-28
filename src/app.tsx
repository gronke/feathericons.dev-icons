import * as feather from "@icons/feather"
import * as wkPayment from "@icons/wolf-kit/payment"
import * as wkSocial from "@icons/wolf-kit/social-media"

import {
	Checkbox,
	CheckboxButton,
	Checkboxes,
	DebugCssEffect,
	Footer,
	Grid,
	GridItem,
	Header,
	Main,
	Range,
	Resource,
	Resources,
	ScrollContainer,
	SearchBar,
	Section,
	Sidebar1,
	Sidebar2,
	UndoSection,
} from "@/components"
import { Icon, toKebabCase } from "@/lib"
import { RangeContext, SearchContext, SIZE_MAX, SIZE_MIN, SIZE_STEP, STROKE_MAX, STROKE_MIN, STROKE_STEP } from "@/state"
import { useContext } from "react"

// TODO: Move to search.tsx
function toNameCase(str: string) {
	return toKebabCase(str).toLowerCase()
}

const featherEntries: [string, Icon][] = Object.entries(feather).map(([k, v]) => [toNameCase(k), v])
const wkSocialMediaEntries: [string, Icon][] = Object.entries(wkSocial).map(([k, v]) => [toNameCase(k), v])
const wkPaymentProcessorsEntries: [string, Icon][] = Object.entries(wkPayment).map(([k, v]) => [toNameCase(k), v])

const entries = [...featherEntries, ...wkSocialMediaEntries, ...wkPaymentProcessorsEntries]

export function App() {
	return (
		<DebugCssEffect>
			<LayoutSidebar1 />
			<LayoutSidebar2 />
			<LayoutMain />
		</DebugCssEffect>
	)
}

function LayoutSidebar1() {
	const {
		showFeather,
		setShowFeather,
		showBrandsOriginal,
		setShowBrandsOriginal,
		showBrandsCircle,
		setShowBrandsCircle,
		showBrandsSquare,
		setShowBrandsSquare,
		showPaymentsOriginal,
		setShowPaymentsOriginal,
		showPaymentsFilled,
		setShowPaymentsFilled,
	} = useContext(SearchContext)!

	const someBrandsChecked = showBrandsOriginal || showBrandsCircle || showBrandsSquare
	const somePaymentsChecked = showPaymentsOriginal || showPaymentsFilled

	return (
		<Sidebar1>
			<Header>
				<Section>
					<SearchBar />
				</Section>
			</Header>
			<ScrollContainer>
				<UndoSection name="Icon packs" icon={feather.Package}>
					{/* Use <div> to no-op Flexbox gap */}
					<div>
						<Checkboxes>
							<Checkbox
								// prettier-ignore
								name="Feather icons"
								icon={feather.Feather}
								checked={showFeather}
								setChecked={setShowFeather}
							/>
						</Checkboxes>
						<Checkboxes>
							<CheckboxButton
								name="Brands"
								icon={$props => <feather.Folder style={{ transform: "scale(0.8)", opacity: 0.375 }} fill="currentColor" strokeWidth={4} {...$props} />}
								onClick={e => {
									for (const setChecked of [setShowBrandsOriginal, setShowBrandsCircle, setShowBrandsSquare]) {
										setChecked(!someBrandsChecked)
									}
								}}
							/>
							<Checkboxes>
								<Checkbox
									// prettier-ignore
									name="Original"
									icon={wkSocial.Twitter}
									checked={showBrandsOriginal}
									setChecked={setShowBrandsOriginal}
								/>
								<Checkbox
									// prettier-ignore
									name="Circle"
									icon={wkSocial.TwitterCircle}
									checked={showBrandsCircle}
									setChecked={setShowBrandsCircle}
								/>
								<Checkbox
									// prettier-ignore
									name="Square"
									icon={wkSocial.TwitterSquare}
									checked={showBrandsSquare}
									setChecked={setShowBrandsSquare}
								/>
							</Checkboxes>
						</Checkboxes>
						<Checkboxes>
							<CheckboxButton
								name="Payment services"
								icon={$props => <feather.Folder style={{ transform: "scale(0.8)", opacity: 0.375 }} fill="currentColor" strokeWidth={4} {...$props} />}
								onClick={e => {
									for (const setChecked of [setShowPaymentsOriginal, setShowPaymentsFilled]) {
										setChecked(!somePaymentsChecked)
									}
								}}
							/>
							<Checkboxes>
								<Checkbox
									// prettier-ignore
									name="Original"
									icon={wkPayment.Stripe}
									checked={showPaymentsOriginal}
									setChecked={setShowPaymentsOriginal}
								/>
								<Checkbox
									// prettier-ignore
									name="Filled"
									icon={wkPayment.Stripe1}
									checked={showPaymentsFilled}
									setChecked={setShowPaymentsFilled}
								/>
							</Checkboxes>
						</Checkboxes>
					</div>
				</UndoSection>
				<hr />
			</ScrollContainer>
			<Footer>
				<Section name="Interwebs" icon={feather.Globe}>
					<Resources>
						<Resource name="Icons" icon={wkSocial.Github} />
						<Resource name="Website" icon={wkSocial.Github} />
						<Resource name="Figma Plugin" icon={wkSocial.Figma} />
						<Resource name="Share on Twitter" icon={wkSocial.Twitter} />
					</Resources>
				</Section>
			</Footer>
		</Sidebar1>
	)
}

function LayoutSidebar2() {
	const { size, setSize, strokeWidth, setStrokeWidth } = useContext(RangeContext)!

	return (
		<Sidebar2>
			<Header>
				<UndoSection name="Size" icon={feather.PenTool}>
					<Range value={size} setValue={setSize} min={SIZE_MIN} max={SIZE_MAX} step={SIZE_STEP} />
				</UndoSection>
			</Header>
			<ScrollContainer>
				<hr />
				<UndoSection name="Stroke width" icon={feather.PenTool}>
					<Range value={strokeWidth} setValue={setStrokeWidth} min={STROKE_MIN} max={STROKE_MAX} step={STROKE_STEP} />
				</UndoSection>
				<hr />
			</ScrollContainer>
		</Sidebar2>
	)
}

function LayoutMain() {
	// TODO

	return (
		<Main>
			<Grid>
				{entries.map(([name, Icon], index) => (
					<GridItem key={index} name={name} icon={Icon} bookmark={Math.random() < 0.1} selected={index === 0} />
				))}
			</Grid>
		</Main>
	)
}
