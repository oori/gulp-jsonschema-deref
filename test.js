import path from 'path';
import fs from 'fs';
import test from 'ava';
import gulpUtil from 'gulp-util';
import tv4 from 'tv4';
import deref from './';

test.cb('Dereferenced schema validation', t => {
	let fixturesPath = path.join(__dirname, 'fixtures/');
	let schemaPath = path.join(fixturesPath, 'main.schema.json');
	let testData = JSON.parse(fs.readFileSync(path.join(fixturesPath, 'main.test.json')));

	const stream = deref();
	stream.once('data', file => {
		let processedSchema = JSON.parse(file.contents.toString());
		let validation = tv4.validateResult(testData, processedSchema);

		if (validation.valid) {
			t.pass();
		} else {
			t.fail(validation.error.message + " in " + validation.error.schemaPath);
		}

		t.end();
	});

	stream.write(new gulpUtil.File({
		base: fixturesPath,
		path: schemaPath,
		contents: fs.readFileSync(schemaPath)
	}));
});
