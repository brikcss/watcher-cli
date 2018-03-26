/* eslint-env mocha */
const exec = require('execa');
const path = require('path');
const assert = require('assert');

describe('watcher-cli()', () => {
	it('fails with no files', () => {
		const cmd = exec(path.join(process.cwd(), 'bin/watcher-cli.js'), {
			reject: false
		});
		cmd.stdout.pipe(process.stdout);
		return cmd.then((result) => {
			assert.equal(result.failed, true);
			assert.equal(result.stderr, '[!!] No files to watch.\n');
		});
	});

	it('fails without either --config or --exec', () => {
		const cmd = exec(path.join(process.cwd(), 'bin/watcher-cli.js'), ['bin/*.js'], {
			reject: false
		});
		cmd.stdout.pipe(process.stdout);
		return cmd.then((result) => {
			assert.equal(result.failed, true);
			assert.equal(result.stderr, '[!!] Either --config or --exec is required.\n');
		});
	});

	it('runs a command with --exec', () => {
		const cmd = exec(
			path.join(process.cwd(), 'bin/watcher-cli.js'),
			['bin/*.js', '--exec="echo Hi"'],
			{
				reject: false
			}
		);
		assert.equal(cmd.killed, false);
		cmd.kill();
	});
});
