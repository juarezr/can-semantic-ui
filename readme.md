# can-semantic-ui

[![Build Status](https://travis-ci.org/juarezr/can-semantic-ui.png?branch=master)](https://travis-ci.org/juarezr/can-semantic-ui)

Web components for easy UI build using canjs javascript library and semantic-ui css framework

## Usage

### ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

```js
import plugin from 'can-semantic-ui';
```

### CommonJS use

Use `require` to load `can-semantic-ui` and everything else
needed to create a template that uses `can-semantic-ui`:

```js
var plugin = require("can-semantic-ui");
```

## AMD use

Configure the `can` and `jquery` paths and the `can-semantic-ui` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    paths: {
	        "jquery": "node_modules/jquery/dist/jquery",
	        "can": "node_modules/canjs/dist/amd/can"
	    },
	    packages: [{
		    	name: 'can-semantic-ui',
		    	location: 'node_modules/can-semantic-ui/dist/amd',
		    	main: 'lib/can-semantic-ui'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

### Standalone use

Load the `global` version of the plugin:

```html
<script src='./node_modules/can-semantic-ui/dist/global/can-semantic-ui.js'></script>
```

## Contributing

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run

```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test.html` page.
Automated tests that run the tests from the command line in Firefox can be run with

```
npm test
```
