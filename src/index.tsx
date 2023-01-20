//// import "the-new-css-reset"
////
//// import "./css/base.scss"
//// import "./css/vars.scss"
////
//// import "uno.css"

import "the-new-css-reset"

import "./css/base.scss"
import "./css/vars-2.scss"

import "./css/type.scss"

import "./css/tailwind.generated.css"

import { createRoot } from "react-dom/client"
//// import { App } from "./app"
import { ProvidedApp } from "./search-app-2"

const root = document.getElementById("root")!
if (import.meta.env.DEV) {
	console.log("[DEBUG] createRoot")
	//// createRoot(root).render(<App initialPath={window.location.pathname} />)
	createRoot(root).render(<ProvidedApp />)
} else {
	console.log("[DEBUG] hydrateRoot")
	//// createRoot(root).render(<App initialPath={window.location.pathname} />)
	createRoot(root).render(<ProvidedApp />)
}
