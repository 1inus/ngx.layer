System.config({
	// DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
	transpiler: 'ts',
	typescriptOptions: {
		// Copy of compiler options in standard tsconfig.json
		"target": "es5",
		"sourceMap": true,
		"emitDecoratorMetadata": true,
		"experimentalDecorators": true
	},
	meta: {
		'typescript': {
			"exports": "ts"
		}
	},
	paths: {
		'npm:': 'node_modules/'
	},
	//map tells the System loader where to look for things
	map: {
		'app': './app',
		'@angular/core': 'npm:@angular/core/bundles/core.umd.js',
		'@angular/common': 'npm:@angular/common/bundles/common.umd.min.js',
		'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.min.js',
		'@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.min.js',
		'@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
		'@angular/http': 'npm:@angular/http/bundles/http.umd.min.js',
		'@angular/router': 'npm:@angular/router/bundles/router.umd.min.js',
		'@angular/forms': 'npm:@angular/forms/bundles/forms.umd.min.js',

		'@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
		'@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
		'@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
		'@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
		'@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
		'@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
		'@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
		"reflect-metadata":"npm:reflect-metadata/Reflect.js",
		'rxjs': 'npm:rxjs'
	},
	//packages defines our app package
	packages: {
		app: {
			main: './app.ts',
			defaultExtension: 'ts'
		},
		rxjs: {
			defaultExtension: 'js'
		}
	}
});