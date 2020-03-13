const { readdirSync } = require("fs");

const { checkIsDirectory, formatFile, formatAllFiles } = require("./utils");

module.exports = (prevPath, root, isAllFiles) => {
	const isDir = checkIsDirectory(root);

	if (!isDir) {
		console.log();
		console.error(`${prevPath} in not a directory`);
		console.log();
		return;
	}

	const files = readdirSync(root);
	let messages = "";

	// 格式化消息
	if (isAllFiles) {
		messages = formatAllFiles(prevPath, files);
	} else {
		messages = formatFile(files);
	}

	const message = messages.reduce((allMsg, msg) => {
		allMsg += `${msg} \n`;
		return allMsg;
	}, "");

	console.log();
	console.log(message);
};
