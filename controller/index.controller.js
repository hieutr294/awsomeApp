const input = document.getElementById('inp')
const btn = document.getElementById('btn')
const ul = document.getElementById('list')

const {ipcRenderer } = require('electron')

input.addEventListener('keyup',()=>{
    ipcRenderer.send('keyword',input.value)
})

ipcRenderer.on('suggetData',(event,arg)=>{
    ul.innerHTML=""
    arg.map(val=>{
        var li = document.createElement("li");
        var a = document.createElement('a')
        a.innerHTML=val
        a.href="./result.html"
        a.onclick=()=>event.sender.send('searchVal',a.text)
        li.appendChild(a);
        ul.appendChild(li)
    })
})