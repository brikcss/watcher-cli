#!/usr/bin/env node
/** ------------------------------------------------------------------------------------------------
 *  @filename  watcher-cli.js
 *  @author  brikcss  <https://github.com/brikcss>
 *  @description  Simple CLI utility which wraps chokidar to watch files from CLI.
 ** --------------------------------------------------------------------------------------------- */
/* eslint-disable no-console */

// -------------------
// Set up environment.
//
// Dependencies.
const chokidar = require('chokidar');
const exec = require('execa');
const path = require('path');
// Args.
const options = require('minimist')(process.argv.slice(2));
options.files = options._;
// Load config.
if (options.config) {
	options.config = require(path.join(__dirname, options.config));
	// `options.id` will load config from `config[id]`. This allows for multiple configurations in the config file.
	if (options.id) {
		options.config = options.config[options.id];
	}
}

// -----------------
// Validate options.
//
// Files is required.
if (!options.files || !options.files.length) {
	console.error('[!!] No files to watch.');
	process.exit(1);
}
// Config or exec option is required.
if (!options.exec && !options.config) {
	console.error('[!!] Either --config or --exec is required.');
	process.exit(1);
}

// ----------------
// Run the watcher.
//
options.config = options.config || {};
// Create watcher instance.
const watcher = chokidar.watch(options.files, options.config);
watcher.on('ready', () => {
	console.log('[i] Watching:', options.files.join(', '));
});
// Set up events.
if (options.script) {
	watcher.on('change', (filepath) => {
		if (!options.silent) {
			console.log('[i] Modified:', path.relative(process.cwd(), filepath));
		}
		exec(options.exec, options.scriptArgs ? options.scriptArgs.split(',') : []).stdout.pipe(
			process.stdout
		);
	});
} else if (options.exec) {
	watcher.on('change', (filepath) => {
		if (!options.silent) {
			console.log('[i] Modified:', path.relative(process.cwd(), filepath));
		}
		exec.shell(options.exec).then((result) => console.log(result.stdout));
	});
}
if (options.config.on) {
	const events = Object.keys(options.config.on);
	if (events.length) {
		events.forEach((event) => {
			watcher.on(event, options.config.on[event]);
		});
	}
}
