const XLSX = require('xlsx');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const rootPath = path.normalize(__dirname);

function js2excel({filePath ,fileName}) {
    var p = [];
    glob.sync(path.join(rootPath, `/${filePath}/zh/*.js`)).forEach((n) => {
        var _file = n.slice(n.lastIndexOf('/') + 1, n.lastIndexOf('.')); //文件名
        p.push(_file);
    });

    var i18s = glob.sync(path.join(rootPath, `/${filePath}/**/*.js`));
    var lang = {};

    p.forEach((file) => {
        var _lang = [];
        i18s.forEach(function (i18, i) {
            var f = i18.slice(i18.lastIndexOf('/') + 1, i18.lastIndexOf('.'));
            if (f == file) {
                _lang = _lang.concat(expVal(i18));
            }
        });
        lang[file] = _lang;
    });
    ouput(lang);

    function expVal(i18) {
        var json = require(i18);
        var arr = [];
        Object.keys(json).forEach(((w) => {
            var file = i18.split('/')[i18.split('/').length - 2];
            var _worksheet = {};
            _worksheet.key = w;
            _worksheet[file] = json[w];
            arr.push(_worksheet);
        }));
        return arr;
    }

    function ouput(lang) {
        var worksheet = {};
        Object.keys(lang).forEach((l, i) => {
            var a = [];
            var _a = [];
            lang[l].forEach((c) => {
                lang[l].forEach((e) => {
                    if (c.key === e.key) {
                        c = Object.assign({}, c, e);
                    }
                });
                a.push(c);
            });
            a.forEach((x) => {
                var r = false;
                _a.forEach((y) => {
                    if (x.key == y.key) {
                        r = true;
                    }
                });
                if (!r) {
                    _a.push(x);
                }
            });
            var sheets = XLSX.utils.json_to_sheet(_a);
            worksheet[l] = sheets;
        });

        var workbook = {
            SheetNames: p,
            Sheets: Object.assign({}, worksheet)
        };
        const output = `/${fileName}`;
        XLSX.writeFile(workbook, path.join(rootPath, output));
        console.log(`========成功生成lang.xlsx文件 包含${p}共${p.length}个表========`);

    }
}

function excel2js({filePath,fileName}) {
    var workbook = XLSX.readFile(path.join(rootPath, `/${fileName}`));
    to_json(workbook);

    function to_json(workbook) {
        // 获取 Excel 中所有表名
        var sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
        sheetNames.forEach((sheetName) => {
            var _result = {};
            var _worksheet = workbook.Sheets[sheetName];
            _result[sheetName] = XLSX.utils.sheet_to_json(_worksheet);
            Object.keys(_result).forEach(k => {
                Object.keys(_result[k][0]).filter(function (item) {
                    return item != 'key'; //除去key值
                }).forEach(function (lang) {
                    var result = {};
                    _result[k].forEach(k => {
                        result[k.key] = k[lang];
                    });
                    fs.mkdir(path.join(rootPath, `/${filePath}/${lang}/`), err => {}); //建目录
                    fs.open(path.join(rootPath, `/${filePath}/${lang}/${sheetName}.js`), 'w', function (err, fd) {
                        var buf = new Buffer('module.exports = ' + JSON.stringify(result, null, 4));
                        fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {
                        });
                        console.log('============成功生成' + path.join(rootPath, `/${filePath}/${lang}/${sheetName}.js`) + '文件============');
                    });
                });

            });

        });
    }
}



const js2xlsx= {
    js2excel,
    excel2js
};

export default js2xlsx;
