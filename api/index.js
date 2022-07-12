const http = require('http');
const URL = require('url');
const fs = require('fs');
const data = require('./urls.json');
const path = require('path');
const { ok } = require('assert');

http.createServer((req, res) => {
    const { name, url, del } = URL.parse(req.url, true).query;

    if (!name || !url) {
        return res.end(JSON.stringify(data));
    } 
    if (del) {
        data.urls = data.urls.filter(item => item.url !== url);
        fs.writeFile(
            path.join(__dirname, "urls.json"), 
            JSON.stringify(data, null, 2),
            (err) => {
                if (err) throw err;

                res.end(JSON.stringify({message: ok}))
            }
            )
    }
    return res.end('create');
}).listen(3000, () => console.log('API is reunning...'));
