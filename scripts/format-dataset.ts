import * as fs from "node:fs"

import dataset from "./_dataset@4.29.0.json"
import tagset from "./_tagset@4.29.0.json"

import { JSDOM } from "jsdom"
import { toTitleCase } from "../src/lib/cases"
import { detab } from "../src/lib/format"
import { reactify } from "./reactify"
import { stringify } from "./stringify"

// Remove these attributes
const omitAttrs = ["class"]

async function main() {
	// src/data/feather.json
	const data = Object.keys(dataset.data).reduce<Record<string, string[]>>((acc, name) => {
		acc[toTitleCase(name)] = tagset[name as keyof typeof tagset] ?? []
		return acc
	}, {})
	const imports = `import * as feather from "./feather@${dataset.meta.version}"\n\nexport const manifest: Record<keyof typeof feather, string[]> = ${JSON.stringify(data, null, 2).replace("]\n}", "],\n}")}`
	await fs.promises.writeFile(`src/data/feather-manifest@${dataset.meta.version}.ts`, imports + "\n")

	// src/data/feather/
	await fs.promises.rm(`src/data/feather@${dataset.meta.version}`, { recursive: true, force: true })
	await fs.promises.mkdir(`src/data/feather@${dataset.meta.version}`, { recursive: true })

	// src/data/feather/index.ts
	const exports = Object.keys(dataset.data).map(name => detab(`
		export * from "./${toTitleCase(name)}"
	`).trim()).join("\n")
	await fs.promises.writeFile(`src/data/feather@${dataset.meta.version}/index.ts`, exports + "\n")

	// src/data/feather/$Name.tsx
	for (const [name, data] of Object.entries(dataset.data)) {
		const { window } = new JSDOM(data)
		const code = stringify(window.document.body.firstElementChild as SVGSVGElement, { strictJsx: true, omitAttrs })
		const reactCode = reactify(toTitleCase(name), code, { comment: `https://feathericons.dev/${name}` })
		await fs.promises.writeFile(`src/data/feather@${dataset.meta.version}/${toTitleCase(name)}.tsx`, reactCode + "\n")
	}
}

main()
