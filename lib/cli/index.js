/*
  配置命令行参数
*/
const yargs = require("yargs");
const pkg = require("../../package.json");

const argv = yargs
	.usage("otree [option] [source]")
	.option({
		files: {
			alias: "f",
			description: "Tree all the files and directory"
		}
	})
	.help("help")
	.alias("help", "h")
	.version(pkg.version)
	.alias("version", "v")
	.boolean("files")
	.example("otree", "生成当前目录文件树信息")
	.example("otree -f", "生成当前目录所有文件树信息")
	.example("otree -f dir", "生成dir目录所有文件树信息")
	.epilog(pkg.repository.url).argv;

module.exports = argv;
