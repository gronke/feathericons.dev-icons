import * as feather from "./data/react-feather"

import { manifest } from "./data/react-feather-manifest"
import { Anchor, Code, Hairline, Heading1, Heading2, InlineIcon, ListItem, OrderedList, Paragraph, Pre, TextIcon } from "./docs-components"
import { CodePenIcon, CodePenIconColor, NextJsIcon, NextJsIconColor, ReactJsIcon, ReactJsIconColor, SassIcon, SassIconColor, SvgIcon, SvgIconColor, TailwindCssIcon, TailwindCssIconColor, TwitterIcon, TwitterIconColor, TypeScriptIcon, TypeScriptIconColor } from "./icon-config"
import { toKebabCase } from "./lib/cases"
import { detab } from "./lib/format"
import { RouteTransition } from "./route-transition"

export function Docs({ name }: { name: keyof typeof manifest }) {
	return (
		<div className="flex justify-center">
			<div className="w-100% max-w-1024">
				<article className="prose flex flex-col gap-8">
					<RouteTransition>
						<Heading1>
							Get Started With Feather
							{/* &nbsp; */}
							{/* <InlineIcon icon={feather.Feather} /> */}
						</Heading1>
						<Paragraph>
							<Anchor href="https://github.com/feathericons/feather">Feather</Anchor> is a collection of simply beautiful open source icons. Each icon is designed on a 24×24 grid with an emphasis on simplicity, consistency, and flexibility.
						</Paragraph>
						<Paragraph>
							Feather can easily be used in most environments. Use this website to quickly search and copy icon codes as SVG&nbsp;
							<InlineIcon style={{ color: SvgIconColor }} icon={SvgIcon} />, React.js&nbsp;
							<InlineIcon style={{ color: ReactJsIconColor }} icon={ReactJsIcon} />, or TypeScript React.js&nbsp;
							<InlineIcon style={{ color: TypeScriptIconColor }} icon={TypeScriptIcon} />, or use one of the <Anchor href="https://github.com/feathericons/feather#related-projects">related projects</Anchor>.
						</Paragraph>
						<Hairline />
						<Heading2>
							Using {name} <InlineIcon icon={feather[name]} /> With a CDN
						</Heading2>
						<Paragraph>To get started with Feather using a CDN (content delivery network), simply:</Paragraph>
						<OrderedList>
							<ListItem>
								Add <Code lang="html">{`<script src="https://unpkg.com/feather-icons"></script>`}</Code> to <Code lang="html">{`<head>`}</Code>
							</ListItem>
							<ListItem>
								Add <Code lang="html">{`<i data-feather="${toKebabCase(name)}"></i>`}</Code> syntax
							</ListItem>
							<ListItem>
								Invoke <Code lang="js">{`feather.replace()`}</Code>
							</ListItem>
						</OrderedList>
						<p>For example:</p>
						<Pre lang="html">
							{detab(`
								<!DOCTYPE html>
								<html lang="en">
									<head>
										<script src="https://unpkg.com/feather-icons"></script>
									</head>
									<body>
										<i data-feather="${toKebabCase(name)}"></i>
										<script>
											feather.replace()
										</script>
									</body>
								</html>
							`)}
						</Pre>
						<Paragraph>
							Click here to get started with a <Anchor href="https://codepen.io/pen?template=WOJZdM">CodePen</Anchor>&nbsp;
							<InlineIcon style={{ color: CodePenIconColor }} icon={CodePenIcon} /> template.
						</Paragraph>
						<Hairline />
						<Heading2>
							Using {name} <InlineIcon icon={feather[name]} /> With React.js&nbsp;
							<InlineIcon style={{ color: ReactJsIconColor }} icon={ReactJsIcon} />
						</Heading2>
						<Paragraph>To get started with Feather using React.js, simply:</Paragraph>
						<OrderedList>
							<ListItem>
								Run <Code lang="sh">{`npm i react-feather`}</Code> or <Code lang="sh">{`yarn add react-feather`}</Code> or <Code lang="sh">{`pnpm i react-feather`}</Code>
							</ListItem>
							<ListItem>
								Add <Code lang="tsx">{`import { ${name} } from "react-feather"`}</Code>
							</ListItem>
							<ListItem>
								Invoke <Code lang="tsx">{`<${name} />`}</Code>
							</ListItem>
						</OrderedList>
						<p>For example:</p>
						<Pre lang="sh">
							{detab(`
								npm i react-feather
								# Or yarn add react-feather
								# Or pnpm i react-feather
							`)}
						</Pre>
						<Pre lang="tsx">
							{detab(`
								import { ${name} } from "react-feather"

								export default function App() {
									return (
										<div className="flex h-screen items-center justify-center">
											<div className="flex h-10 items-center gap-2 rounded-full bg-sky-500 px-4">
												<${name} classNameName="h-5 w-5 text-white" />
												<div className="text-[12px] font-[700] tracking-wider text-white">HELLO WORLD</div>
											</div>
										</div>
									)
								}
							`)}
						</Pre>
						<Paragraph>
							Click here to get started with a <Anchor href="https://play.tailwindcss.com/jPEYvRowr3">Tailwind CSS</Anchor>&nbsp;
							<InlineIcon style={{ color: TailwindCssIconColor }} icon={TailwindCssIcon} /> template.
						</Paragraph>
						<Hairline />
						<Paragraph>
							<small>
								Looking for the original Feather website? <Anchor href="https://feathericons.com">Click here.</Anchor>
							</small>
						</Paragraph>
						<Hairline />
						<Paragraph>
							<small>
								Icons by <Anchor href="https://twitter.com/colebemis">@colebemis</Anchor>&nbsp;
								<InlineIcon style={{ color: TwitterIconColor }} icon={TwitterIcon} />, website by <Anchor href="https://twitter.com/username_ZAYDEK">@username_ZAYDEK</Anchor>&nbsp;
								<InlineIcon style={{ color: TwitterIconColor }} icon={TwitterIcon} />
							</small>
							<br />
							<small>
								Feather is licensed as <Anchor href="https://github.com/feathericons/feather/blob/master/LICENSE">MIT open source</Anchor>. Icons may be used for personal and commercial use without attribution.
							</small>
							<br />
							<small>
								Built using{" "}
								<Anchor href="https://reactjs.org">
									<TextIcon style={{ color: ReactJsIconColor }} icon={ReactJsIcon}>
										React.js
									</TextIcon>
								</Anchor>
								,{" "}
								<Anchor href="https://nextjs.org">
									<TextIcon style={{ color: NextJsIconColor }} icon={NextJsIcon}>
										Next.js
									</TextIcon>
								</Anchor>
								,{" "}
								<Anchor href="https://typescriptlang.org">
									<TextIcon style={{ color: TypeScriptIconColor }} icon={TypeScriptIcon}>
										TypeScript
									</TextIcon>
								</Anchor>
								,{" "}
								<Anchor href="https://tailwindcss.com">
									<TextIcon style={{ color: TailwindCssIconColor }} icon={TailwindCssIcon}>
										Tailwind CSS
									</TextIcon>
								</Anchor>
								, and{" "}
								<Anchor href="https://sass-lang.com">
									<TextIcon style={{ color: SassIconColor }} icon={SassIcon}>
										Sass
									</TextIcon>
								</Anchor>
							</small>
						</Paragraph>
					</RouteTransition>
				</article>
			</div>
		</div>
	)
}
