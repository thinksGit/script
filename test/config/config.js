const path = require('path');
let config = {
    //项目与当前文件的打包路径
    dist: "../public/",
    //当前文件的路径
    currentDir: __dirname,
    build: {
        js: [
            //from相对于当前文件的源目录, to 项目对于dist（打包后目录）的位置
            //to: .js结尾打包为一个文件 否则分开打包
            {from: "../src/common", to: "common/common.js"},
            {from: "../src/code", to: "view/"}
        ],
        css: [
            {from: "../src/code", to: "view/"} 
        ],
        html: [
            {from: "../src/code", to: "view/"}
        ]
    }
};
module.exports = config;
