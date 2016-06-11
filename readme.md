# gulp-jsonschema-deref

[![Build Status](https://travis-ci.org/oori/gulp-jsonschema-deref.svg?branch=master)](https://travis-ci.org/oori/gulp-jsonschema-deref)
[![Dependencies](https://david-dm.org/oori/gulp-jsonschema-deref.svg)](https://david-dm.org/oori/gulp-jsonschema-deref)
[![Inline docs](http://inch-ci.org/github/oori/gulp-jsonschema-deref.svg?branch=master)](http://inch-ci.org/github/oori/gulp-jsonschema-deref)
[![npm](http://img.shields.io/npm/v/gulp-jsonschema-deref.svg)](https://www.npmjs.com/package/gulp-jsonschema-deref)
[![License](https://img.shields.io/npm/l/gulp-jsonschema-deref.svg)](LICENSE)

> Gulp plugin to resolve $ref references (*local+file+http*) and bundle into a single json schema

## Install

```
$ npm install --save-dev gulp-jsonschema-deref
```


## Usage

```js
var gulp = require('gulp');
var jsonschemaDeref = require('gulp-jsonschema-deref');

var schemaFiles = '*.schema.json',
	definitionsFiles = 'definitions/' + schemaFiles,	// (optional)
	buildFolder = 'build';

gulp.task('resolve-schema', function() {
	var stream = gulp.src( schemaFiles )
		.pipe( jsonschemaDeref() )
		.pipe( gulp.dest(buildFolder) );
	return stream;
});


gulp.task('watch-schema', function() {
	var watcher = gulp.watch( [schemaFiles,definitionsFiles], ['resolve-schema']);

	watcher.on('change', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});

gulp.task('default', ['resolve-schema','watch-schema']);
```


## API
Currently, dependant on [json-schema-ref-parser](https://github.com/BigstickCarpet/json-schema-ref-parser)

### jsonschemaDeref([options])

#### options

see: [dereference](https://github.com/BigstickCarpet/json-schema-ref-parser/blob/master/docs/ref-parser.md#dereferenceschema-options-callback)

## License

MIT © [oori](https://github.com/oori)
