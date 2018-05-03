'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var parser = require('json-schema-ref-parser');

/**
 * Dereference a jsonschema
 */
function dereference(file, opts, cb) {
	var _this = this;
	parser.dereference(file.path, opts, function (err, schema) {
		if (err) {
			_this.emit('error', new gutil.PluginError('gulp-jsonschema-deref', err, {fileName: file.path}));
		} else {
			file.contents = Buffer.from(JSON.stringify(schema));
			_this.push(file);
		}
		cb();
	});
}

/**
 * Typical gulp plugin boilerplate
 */
module.exports = function (opts) {
	opts = opts || {};

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-jsonschema-deref', 'Streaming not supported'));
			return;
		}

		try {
			dereference.call(this, file, opts, cb);
		} catch (err) {
			cb(new gutil.PluginError('gulp-jsonschema-deref', err));
		}
	});
};
