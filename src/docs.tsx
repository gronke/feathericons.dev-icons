import * as feather from "./data/react-feather"

import { manifest } from "./data/react-feather-manifest"
import { Anchor, Code, CodeBlock, Hairline, Heading1, Heading2, InlineIcon, ListItem, OrderedList, Paragraph } from "./docs-components"
import { NextJsIcon, NextJsIconColor, ReactJsIcon, ReactJsIconColor, SassIcon, SassIconColor, SvgIcon, SvgIconColor, TailwindCssIcon, TailwindCssIconColor, TwitterIcon, TwitterIconColor, TypeScriptIcon, TypeScriptIconColor } from "./icon-config"
import { detab } from "./lib/format"

export function Docs({ name }: { name: keyof typeof manifest }) {
	return (
		<div className="flex justify-center py-64">
			<article className="prose flex basis-1e3 flex-col gap-8">
				<Heading1>
					Get Started With Feather&nbsp;
					<InlineIcon icon={feather.Feather} />
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
						Add <Code>{`<script src="https://unpkg.com/feather-icons"></script>`}</Code> to <Code>{`<head>`}</Code>
					</ListItem>
					<ListItem>
						Add as many icons as desired using <Code>{`<i data-feather="{icon-name}"></i>`}</Code> syntax
					</ListItem>
					<ListItem>
						Call <Code>{`feather.replace()`}</Code>
					</ListItem>
				</OrderedList>
				<p>For example:</p>
				<CodeBlock lang="html">
					{detab(`
						<!DOCTYPE html>
						<html lang='en'>
							<head>
								<script src='https://unpkg.com/feather-icons'></script>
							</head>
							<body>
								<i data-feather='smile'></i>
								<script>
									feather.replace();
								</script>
							</body>
						</html>
					`).replaceAll("\t", "  ")}
				</CodeBlock>
				<Hairline />
				<Heading2>
					Using {name} <InlineIcon icon={feather[name]} /> With React.js&nbsp;
					<InlineIcon style={{ color: ReactJsIconColor }} icon={ReactJsIcon} />
				</Heading2>
				<Paragraph>To get started with Feather using React.js, simply:</Paragraph>
				<OrderedList>
					<ListItem>
						Run <Code>{`npm i react-feather`}</Code> or <Code>{`yarn add react-feather`}</Code> or <Code>{`pnpm i react-feather`}</Code>
					</ListItem>
					<ListItem>
						Import icons using <Code>{`import { IconName } from "react-feather"`}</Code> syntax
					</ListItem>
					<ListItem>
						Render icons using <Code>{`<IconName />`}</Code> syntax
					</ListItem>
				</OrderedList>
				<p>For example:</p>
				<CodeBlock lang="sh">
					{detab(`
						npm i react-feather
						# Or yarn add react-feather
						# Or pnpm i react-feather
					`).replaceAll("\t", "  ")}
				</CodeBlock>
				<CodeBlock lang="tsx">
					{detab(`
						import { Smile } from 'react-feather';

						export default function App() {
							return (
								<div className='flex h-screen items-center justify-center'>
									<div className='flex h-10 items-center gap-2 rounded-2xl bg-sky-500 px-4'>
										<Smile className='h-4 w-4 text-white' />
										<div className='text-sm font-semibold tracking-wider text-white'>HELLO WORLD</div>
									</div>
								</div>
							);
						}
					`).replaceAll("\t", "  ")}
				</CodeBlock>
				<Hairline />
				<Paragraph>
					<small>
						Looking for the original Feather website? <Anchor href="https://feathericons.com">Click here.</Anchor>
						{/* &nbsp; */}
						{/* <TextIcon className="text-gray-500" icon={feather.ExternalLink} /> */}
					</small>
				</Paragraph>
				<Hairline />
				<Paragraph>
					<small>
						Icons by <Anchor href="https://twitter.com/colebemis">@colebemis</Anchor>&nbsp;
						<InlineIcon style={{ color: TwitterIconColor }} icon={TwitterIcon} /> and website by <Anchor href="https://twitter.com/username_ZAYDEK">@username_ZAYDEK</Anchor>&nbsp;
						<InlineIcon style={{ color: TwitterIconColor }} icon={TwitterIcon} />
					</small>
					<br />
					<small>
						{/* Feather&nbsp; */}
						{/* <TextIcon className="text-gray-500" icon={feather.Feather} />  */}
						Feather is licensed as <Anchor href="https://github.com/feathericons/feather/blob/master/LICENSE">MIT open source</Anchor>. Icons may be used for personal and commercial use without attribution.
					</small>
					<br />
					<small>
						Built using{" "}
						<Anchor href="https://reactjs.org">
							React.js&nbsp;
							<InlineIcon style={{ color: ReactJsIconColor }} icon={ReactJsIcon} />
						</Anchor>
						,{" "}
						<Anchor href="https://nextjs.org">
							Next.js&nbsp;
							<InlineIcon style={{ color: NextJsIconColor }} icon={NextJsIcon} />
						</Anchor>
						,{" "}
						<Anchor href="https://typescriptlang.org">
							TypeScript&nbsp;
							<InlineIcon style={{ color: TypeScriptIconColor }} icon={TypeScriptIcon} />
						</Anchor>
						,{" "}
						<Anchor href="https://tailwindcss.com">
							Tailwind CSS&nbsp;
							<InlineIcon style={{ color: TailwindCssIconColor }} icon={TailwindCssIcon} />
						</Anchor>
						,{" "}
						<Anchor href="https://sass-lang.com">
							and Sass&nbsp;
							<InlineIcon style={{ color: SassIconColor }} icon={SassIcon} />
						</Anchor>
					</small>
					<br />
				</Paragraph>
			</article>
		</div>
	)
}
