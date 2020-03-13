const { existsSync } = require("fs");
const { resolve } = require("path");

const defaultConfig = require("./config");
const argv = require("./cli");
const handler = require("./handler");

// 获取根目录
let path = "";
const prevPath = argv.root || defaultConfig.root;

if (prevPath) {
	path = resolve(defaultConfig.root, prevPath);
	const isExist = existsSync(path);

	if (!isExist) {
		console.log();
		console.error(`${prevPath} is not current path`);
		console.log();
		return;
	}
}

const root = path || defaultConfig.root;

handler(prevPath, root, argv.files);
