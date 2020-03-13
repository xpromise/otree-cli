/*
  配置命令行参数
*/
const yargs = require("yargs");
const pkg = require("../../package.json");

const argv = yargs
	.config("config")
	.usage("$0 [option] [source]")
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
	.boolean("all")
	.example("$0", "生成当前目录文件树信息")
	.example("$0 -f", "生成当前目录所有文件树信息")
	.example("$0 -f dir", "生成dir目录所有文件树信息")
	.epilog(pkg.repository.url).argv;

module.exports = argv;
