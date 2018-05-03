import path from 'path';
import fs from 'fs';
import test from 'ava';
import gulpUtil from 'gulp-util';
import tv4 from 'tv4';
import deref from '.';

test.cb('Dereferenced schema validation', t => {
	const fixturesPath = path.join(__dirname, 'fixtures/');
	const schemaPath = path.join(fixturesPath, 'main.schema.json');
	const testData = JSON.parse(fs.readFileSync(path.join(fixturesPath, 'main.test.json')));

	const stream = deref();
	stream.once('data', file => {
		const processedSchema = JSON.parse(file.contents.toString());
		const validation = tv4.validateResult(testData, processedSchema);

		if (validation.valid) {
			t.pass();
		} else {
			t.fail(validation.error.message + ' in ' + validation.error.schemaPath);
		}

		t.end();
	});

	stream.write(new gulpUtil.File({
		base: fixturesPath,
		path: schemaPath,
		contents: fs.readFileSync(schemaPath)
	}));
});
