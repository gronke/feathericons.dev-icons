import fs from "node:fs"

import JSZip from "jszip"
import featherTags from "./_feather-tags.generated.json"
import feather from "./_feather.generated.json"

import { JSDOM } from "jsdom"
import { toTitleCase } from "../src/lib/cases"
import { detab } from "../src/lib/format"
import { formatAsSvg, formatAsTsx } from "./utils/format"
import { stringify } from "./utils/stringify"

const omitAttrs = ["class"]

async function feather_svg() {
	const zip = new JSZip()

	// src/data/feather
	try {
		await fs.promises.rm(`src/data/feather`, { recursive: true, force: true })
	} catch { }
	await fs.promises.mkdir(`src/data/feather`, { recursive: true })

	// src/data/feather/<name>.svg
	for (const [name, data] of Object.entries(feather.data)) {
		const { window } = new JSDOM(data)
		const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: false, omitAttrs })
		const codeAsSvg = formatAsSvg(name, code, {
			//// license: `<!-- Feather v${feather.meta.version} | MIT License | https://github.com/feathericons/feather -->`,
			comment: `https://feathericons.com/${name}`,
		})
		await fs.promises.writeFile(`src/data/feather/${name}.svg`, codeAsSvg + "\n")
		zip.file(`${name}.svg`, codeAsSvg.replaceAll("\t", "  ") + "\n")
	}

	// src/data/feather.zip
	const buffer = await zip.generateAsync({ type: "nodebuffer" })
	await fs.promises.writeFile(`src/data/feather.zip`, buffer)
}

async function feather_tsx() {
	// src/data/react-feather-manifest.json
	const data = Object.keys(feather.data).reduce<Record<string, string[]>>((acc, name) => {
		acc[toTitleCase(name)] = featherTags[name as keyof typeof featherTags] ?? []
		return acc
	}, {})
	const imports = `import * as feather from "./react-feather"\n\nexport const version = ${JSON.stringify(feather.meta.version)}\n\nexport const manifest: Record<keyof typeof feather, string[]> = ${JSON.stringify(data, null, 2).replace("]\n}", "],\n}")}`
	await fs.promises.writeFile(`src/data/react-feather-manifest.ts`, imports + "\n")

	// src/data/react-feather
	try {
		await fs.promises.rm(`src/data/react-feather`, { recursive: true, force: true })
	} catch { }
	await fs.promises.mkdir(`src/data/react-feather`, { recursive: true })

	// src/data/react-feather/index.ts
	const exports = Object.keys(feather.data).map(name => detab(`
		export * from "./${toTitleCase(name)}"
	`).trim()).join("\n")
	await fs.promises.writeFile(`src/data/react-feather/index.ts`, exports + "\n")

	// src/data/react-feather/<Name>.tsx
	for (const [name, data] of Object.entries(feather.data)) {
		const { window } = new JSDOM(data)
		const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: true, omitAttrs })
		const codeAsTsx = formatAsTsx(toTitleCase(name), code, {
			//// license: `/*! Feather v${feather.meta.version} | MIT License | https://github.com/feathericons/feather */`,
			comment: `https://feathericons.com/${name}`,
		})
		await fs.promises.writeFile(`src/data/react-feather/${toTitleCase(name)}.tsx`, codeAsTsx + "\n")
	}
}

async function main() {
	await feather_svg()
	await feather_tsx()
}

main()
