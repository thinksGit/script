const http = require('http');
const ke = require('./routeModel.js');
const url = require('url');
var app2 = new ke();
app2.use("/back/", () => {
    console.log("path=" + "/home");
});
var app = http.createServer(app2);
app.listen(3030, 'localhost', () =>{
    console.log('nodeJs port 3030', ' server statrt........');
})

