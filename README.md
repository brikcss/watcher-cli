# Watcher CLI

[![Greenkeeper badge](https://badges.greenkeeper.io/brikcss/watcher-cli.svg)](https://greenkeeper.io/)

> CLI utility to watch files and do stuff when they change. A tiny wrapper around [chokidar](https://www.npmjs.com/package/chokidar).

<!-- Shields. -->
<p>
	<!-- NPM version. -->
	<a href="https://www.npmjs.com/package/@brikcss/watcher-cli">
		<img alt="NPM version" src="https://img.shields.io/npm/v/@brikcss/watcher-cli.svg?style=flat-square">
	</a>
	<!-- NPM downloads/month. -->
	<a href="https://www.npmjs.com/package/@brikcss/watcher-cli">
		<img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/@brikcss/watcher-cli.svg?style=flat-square">
	</a>
	<!-- Travis branch. -->
	<a href="https://github.com/brikcss/watcher-cli/tree/master">
		<img alt="Travis branch" src="https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square&label=master">
	</a>
	<!-- Commitizen friendly. -->
	<a href="http://commitizen.github.io/cz-cli/">
		<img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square">
	</a>
	<!-- Semantic release. -->
	<a href="https://github.com/semantic-release/semantic-release">
		<img alt="semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square">
	</a>
	<!-- Prettier code style. -->
	<a href="https://prettier.io/">
		<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
	</a>
	<!-- MIT License. -->
	<!-- <a href="https://choosealicense.com/licenses/mit/">
		<img alt="License" src="https://img.shields.io/npm/l/express.svg?style=flat-square">
	</a> -->
</p>

## Install

```sh
npm install -D @brikcss/watcher-cli
```

## Usage

- To watch files and run a shell command:

	```sh
	watch <source files> --exec="<command to execute>"
	```

- To watch files and run a script:

	```sh
	watch <source files> --script="<path to script>"
	```

- To watch files and run chokidar with a config file:

	```sh
	watch <source files> --config=<path to config>
	```

## Configuration File

The config file is simply passed to chokidar, and it accepts any of [chokidar's options](https://github.com/paulmillr/chokidar#getting-started).

### Event listeners

The `config.on` property is reserved for chokidar's event listeners, and is attached to the chokidar instance. Any chokidar event can be passed here.

### Multiple watchers

You may configure multiple watchers via the config file. To do this, add an `id` for each watcher you wish to create. To run the configuration for that id, simply run:

```sh
watch <source files> --config=<path to config> --id=<id>
```

## Environment support

| Node   | CLI   | UMD   | Browser   |
|:-------|:-----:|:------|:----------|
| 𐄂      | ✔     | 𐄂     | 𐄂         |
