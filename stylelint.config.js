const order = [
	"content",
	"position",
	"inset",
	"top",
	"right",
	"bottom",
	"left",
	"z-index",
	"flex",
	"flex-grow",
	"flex-shrink",
	"flex-basis",
	"display",
	"flex-direction",
	"grid-template-columns",
	"grid-template-rows",
	"grid-auto-columns",
	"grid-auto-rows",
	"grid-auto-flow",
	"place-content",
	"place-items",
	"justify-content",
	"justify-items",
	"align-content",
	"align-items",
	"flex-wrap",
	"order",
	"gap",
	"column-gap",
	"row-gap",
	"margin",
	"margin-top",
	"margin-right",
	"margin-bottom",
	"margin-left",
	"padding",
	"padding-top",
	"padding-right",
	"padding-bottom",
	"padding-left",
	"height",
	"min-height",
	"max-height",
	"width",
	"min-width",
	"max-width",
	"aspect-ratio",
	"background",
	"background-color",
	"background-image",
	"border-radius",
	"border-top-right-radius",
	"border-bottom-right-radius",
	"border-bottom-left-radius",
	"box-shadow",
	"stroke-width",
	"font",
	"font-weight",
	"font-size",
	"line-height",
	"font-family",
	"font-feature-settings",
	"letter-spacing",
	"vertical-align",
	"text-align",
	"text-transform",
	"color",
	"transform",
	"opacity",
	"transition",
	"cursor",
	"pointer-events",
	"user-select",
]

module.exports = {
	customSyntax: "postcss-sass",
	plugins: ["stylelint-order"],
	rules: {
		"order/properties-order": order,
	},
}
