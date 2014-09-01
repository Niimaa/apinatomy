//noinspection BadExpressionStatementJS
({
	baseUrl:                "./src",
	paths:                  {
		'jquery':    "../bower_components/jquery/dist/jquery",
		'jquery-ui': "../bower_components/jquery-ui/jquery-ui"
	},
	shim:                   {
		'jquery':    { exports: '$' },
		'jquery-ui': ['jquery']
	},
	include: ['amy-circuitboard', '../node_modules/almond/almond'],
	exclude:                ['jquery', 'jquery-ui'],
	out:                    "dist/amy-circuitboard.js",
	findNestedDependencies: true,
	removeCombined:         true
})
