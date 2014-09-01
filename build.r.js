//noinspection BadExpressionStatementJS
({
	paths:                  {
		'jquery':    "bower_components/jquery/dist/jquery",
		'jquery-ui': "bower_components/jquery-ui/jquery-ui"
	},
	shim:                   {
		'jquery':    { exports: '$' },
		'jquery-ui': ['jquery']
	},
	include:                ['src/amy-circuitboard'],
	exclude:                ['jquery', 'jquery-ui'],
	out:                    "dist/amy-core.js",
	findNestedDependencies: true,
	removeCombined:         true,
	optimize:               'none',
	onModuleBundleComplete: function (data) {
		var fs = module.require('fs'),
		    amdclean = module.require('amdclean'),
		    outputFile = data.path,
		    cleanedCode = amdclean.clean({
			    'filePath': outputFile,
			    transformAMDChecks: false,
			    wrap: {
				    start: 'define(["jquery", "jquery-ui"], function (jquery) {',
				    end: '});'
			    }
		    });
		fs.writeFileSync(outputFile, cleanedCode);
	}
})
