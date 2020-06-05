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
        li.appendChild(document.createTextNode(val));
        ul.appendChild(li)
    })
})