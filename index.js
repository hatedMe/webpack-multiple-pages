
const glob = require("glob");
const path = require('path');

function getEntry(globPath) {
    var entries = {},
        basename, tmp, pathname;

    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        console.log( basename ,pathname  );
        entries[basename] = entry;
    });
    return entries;
}



const Entry = getEntry('./src/views/**/*.js');

console.log( Entry );