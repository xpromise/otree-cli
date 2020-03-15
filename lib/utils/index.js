const { statSync, readdirSync } = require("fs");
const { resolve } = require("path");

/*
	正常：| | ├─
	特殊：最后一个
		最后一个是文件夹 └─
			里面得文件最后一个space 少一个 |
		最后一个是文件 └─
*/

function formatAllFiles(prevPath, files, count = 0, isFinal = false) {
	const totalLength = files.length;
	const finalIndex = totalLength - 1;

	let messages = [];

	for (let i = 0; i < totalLength; i++) {
		const file = files[i];
		// 忽略 node_modules .git
		if (file === "node_modules" || file === ".git") continue;

		const path = resolve(prevPath, file);
		const isDir = checkIsDirectory(path);

		const isFinalIndex = i === finalIndex;

		let spaces = "";
		// 加空格
		for (let j = 0; j < count; j++) {
			spaces += isFinal && j === count - 1 ? "   " : "|  ";
		}

		const message = isFinalIndex
			? `${spaces}└─ ${file}`
			: `${spaces}├─ ${file}`;

		if (isDir) {
			const files = readdirSync(path);
			const allFilesMessage = formatAllFiles(
				resolve(prevPath, file),
				files,
				count + 1,
				isFinalIndex
			);
			messages = messages.concat(message).concat(allFilesMessage);
			continue;
		}

		messages.push(message);
	}

	return messages;
}

function checkIsDirectory(path) {
	try {
		const stats = statSync(path);
		return stats.isDirectory();
	} catch {
		return false;
	}
}

module.exports = {
	checkIsDirectory,
	formatFile: files => {
		const finalIndex = files.length - 1;

		const messages = files.map((file, index) => {
			return index === finalIndex ? `└─ ${file}` : `├─ ${file}`;
		});

		return messages;
	},
	formatAllFiles
};
