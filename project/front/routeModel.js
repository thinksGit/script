const url = require('url');
const queryString = require('querystring');
const fs = require('fs');
function ke(){
    let tasks = [];
    let app = function(req, res){
        let i = 0;
        let path = url.parse(req.url);
        function next(){
            let task = tasks[i++];
            let params = queryString.parse(path.query);
            if(!task) {
                res.write("404 NOT FOUND");
                res.end();
            }
            setHeader(res);
            res.writeHead(200,{'Content-Type':'text/html'})
            // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
            fs.readFile('./pulic/index2.html','utf-8',function(err,data){
                if(err){
                    throw err ;
                }
	            res.end(data);
            })
        }
        next();
    }
    app.use = (baseUrl, callBack)=>{
        tasks.push({
            baseUrl : baseUrl,
            exec: callBack,
        })
    }
    function setHeader(res){
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    
    return app
}
module.exports = ke;
