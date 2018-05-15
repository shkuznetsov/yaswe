/* const fs = require('fs');

const $ = cheerio.load(fs.readFileSync('test-article/index.html'));
console.log();

*/

const fs = require('fs');
const path = require('path');
const glob = require("glob");
const cheerio = require('cheerio');

const opt = {
	contentPath: path.join(path.resolve(__dirname), 'content')
};

glob(path.join(opt.contentPath, '**/index.html'), (err, files) => {
	files.forEach((indexPathAbsolute) => {
		let post = new Post(indexPathAbsolute);
	});
});

class Post {
	constructor(indexPathAbsolute) {
		this.indexPathAbsolute = indexPathAbsolute;
		this.folderPathAbsolute = path.dirname(indexPathAbsolute);
		this.indexPath = path.relative(opt.contentPath, indexPathAbsolute);
		this.folderPath = path.dirname(this.indexPath);
		fs.readFile(indexPathAbsolute, (err, data) => {
			this.$ = cheerio.load(data);
			this.meta = {
				author: this.$('meta[name=author]').attr('content')
			};
			console.log(this);
		});
	}
}