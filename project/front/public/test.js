function test(){
    let str = 'hello, world';
    //alert(str);
    let xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.open("get", "http://localhost:3030/home", false);
    xhr.send(null);
    console.log(xhr.readyState);
    if(xhr.status == 200){
       // return alert(xhr.responseText);
       return;
    }
    alert("unsuccessfull: " + xhr.status)
}
