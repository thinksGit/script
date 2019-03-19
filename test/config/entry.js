const path = require('path');
const glob = require('glob');
const config = require('./config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webHtml = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function setEntrys() {
    let entrys = {};
    setJsEntry(entrys);
    console.log(entrys)
    return entrys;
}
function setCssEntry(result){
    let buildCss = config.build.css;
    buildCss.forEach(item => {
        getEntryObj(item.from, item.to); 
    })
    function getEntryObj(from, to){
        let fromPath = path.resolve(config.currentDir, from);
        let files = glob.sync(fromPath + "/**/*.css"); 
        let reg = new RegExp('.*\\.css$', 'g');
        let key = to.substring(0, to.length - 3);
        files.forEach(item =>{
            key = item.replace(fromPath + "/", to);
            console.log(path.resolve(config.currentDir, config.dist, key))
            result.push(new ExtractTextPlugin(key));
        })
    }
}
function setJsEntry(entrys){
    let buildJs = config.build.js;
    buildJs.forEach(item => {
        getEntryObj(item.from, item.to); 
    })
    function getEntryObj(from, to){
        let fromPath = path.resolve(config.currentDir, from);
        let files = glob.sync(fromPath + "/**/*.js"); 
        let reg = new RegExp('.*\\.js$', 'g');
        let key = to.substring(0, to.length - 3);
        //.js结尾打包为一个文件
        if(reg.test(to)) return entrys[key] = files;
        files.forEach(item =>{
            key = item.replace(fromPath + "/", to);
            key = key.substring(0, key.length -3)
            entrys[key] = item;
        })
    }
}
function setPlugins(){
    let result = [];
    setWebHtmlPlugs(result);
    setCleanPlug(result);
    setCssEntry(result);
    return result;
}
function setCleanPlug(result){
    result.push(new CleanWebpackPlugin());
}
function setWebHtmlPlugs(result){
    let buildJs = config.build.html;
    buildJs.forEach(item => {
        getWebHtmlObj(item.from, item.to); 
    })
    function getWebHtmlObj(from, to){
        let fromPath = path.resolve(config.currentDir, from);
        let files = glob.sync(fromPath + "/**/*.html"); 
        files.forEach(item =>{
            filename = item.replace(fromPath + "/", to);
            name = filename.substring(0, filename.length -5)
            result.push(new webHtml({
                filename: filename, 
                template: item,
                showErrors: true,
                inject: 'body',
                hash: true,
                chunks: ['common/common', name]
             }
             ));
        })
    }
}
module.exports.entrys = setEntrys;
module.exports.plugins = setPlugins;
