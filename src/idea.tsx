import * as fs from "fs"
import * as path from "path"

import { renderToString } from "react-dom/server"
import { App } from "./app"

const manifest = {
  "/":        { title: "Home" },
  "/foo":     { title: "Page foo" },
  "/foo/bar": { title: "Page foo/bar" },
}

let buffer: Buffer
try {
  // Try to read the cached _index.html file -- this is supposed to be the
  // original index.html before static site generation
  buffer = fs.readFileSync("dist/_index.html")
} catch {
  buffer = fs.readFileSync("dist/index.html")
  fs.writeFileSync("dist/index.html", "dist/_index.html")
}

function safePathname(pathname: string) {
  if (pathname.endsWith("/")) {
    return pathname.slice(0, -1) + "index.html"
  } else {
    return pathname + ".html"
  }
}

const contents = buffer.toString()
for (const [pathname, info] of Object.entries(manifest)) {
  const page = contents
    .replace(`<div id="root"></div>\n`, `<div id="root">${renderToString(<App initialPath={pathname} />)}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${info.title}</title>`) // TODO: HTML entities need to be encoded

  console.log(`+ ${pathname}`)
  console.log(page)

  const filename = `dist/${safePathname(pathname)}`
  fs.mkdirSync(path.dirname(filename), { recursive: true })
  fs.writeFileSync(filename, page)
}
