const { statSync, readdirSync } = require("fs");
const { resolve } = require("path");

function formatAllFiles(prevPath, files, count = 0) {
	count++;
	const totalLength = files.length;
	const finalIndex = totalLength - 1;

	let messages = [];

	for (let i = 0; i < totalLength; i++) {
		const file = files[i];
		// 忽略 node_modules .git
		if (file === "node_modules" || file === ".git") continue;

		const path = resolve(prevPath, file);
		const isDir = checkIsDirectory(path);

		let spaces = "";
		// 加空格
		for (let j = 0; j < count; j++) {
			spaces += "  ";
		}

		const message =
			i === finalIndex ? `${spaces}└─ ${file}` : `${spaces}├─ ${file}`;

		if (isDir) {
			const files = readdirSync(path);
			const allFilesMessage = formatAllFiles(prevPath, files, count + 1);
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
