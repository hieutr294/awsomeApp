const {ipcRenderer} = require('electron')
const list = document.getElementById('list')

ipcRenderer.on('result',(event,arg)=>{
    arg.map(val=>{
        let card = document.createElement('div')
        let titleAu = document.createElement('div')
        let img = document.createElement('img')
        let a = document.createElement('a')
        let p2 = document.createElement('p')
        img.width=168
        img.height=94
        img.src = val.img
        card.id='card'
        titleAu.id='titleAu'
        card.appendChild(img)
        a.innerHTML=val.title
        a.href="./player.html"
        a.onclick=()=>event.sender.send('selectItem',val)
        p2.innerHTML=val.author
        titleAu.appendChild(a)
        titleAu.appendChild(p2)
        card.appendChild(titleAu)

        list.appendChild(card)
    })
})