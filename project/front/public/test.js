function test(){
    //alert(str);
    // let xhr = new XMLHttpRequest();
    // console.log(xhr);
    // xhr.open("get", "http://localhost:3030/home", false);
    // xhr.send(null);
    // console.log(xhr.readyState);
    // if(xhr.status == 200){
    //    // return alert(xhr.responseText);
    //    return;
    // }
    // alert("unsuccessfull: " + xhr.status)
    console.log(window.location.href)
    window.location.href = "/view/index2.html?aa=2";
}
function getQueryParam(){
    let search = window.location.search;
    if(search) search = '{"' + search.substring(1, search.length) + '"}';
    search = search.replace(/[& | =]/g, (str) =>{
        if(str == "&") return '","';
        return '":"';
    })   
    let query = JSON.parse(search);
    console.log(query)
}
function hash(){
    getQueryParam();
}
window.onload=function (){
    hash();
}