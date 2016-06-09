# gulp-jsonschema-deref [![Build Status](https://travis-ci.org/oori/gulp-jsonschema-deref.svg?branch=master)](https://travis-ci.org/oori/gulp-jsonschema-deref)

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

### jsonschemaDeref([options])

#### options

see: [dereference](https://github.com/BigstickCarpet/json-schema-ref-parser/blob/master/docs/ref-parser.md#dereferenceschema-options-callback)

## License

MIT © [oori](https://github.com/oori)