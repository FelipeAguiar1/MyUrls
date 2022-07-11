const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    const file = req.url === '/' ? 'index.html' : req.url;
    const pathJoin = path.join(__dirname, 'public', file);
    const extname = path.extname(pathJoin);

    const allowedFileTypes = ['.html', '.css', '.js'];
    const allowed = allowedFileTypes.find(item => item == extname);

    if (!allowed) return ;

    fs.readFile(pathJoin, (err, content) => {
        if (err) throw err;

        res.end(content);
    });

}).listen(5000, () => console.log('server is reunning...'));