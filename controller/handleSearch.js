const {ipcMain} = require('electron')
const axios = require('axios')

module.exports.getAutoComplteData = ()=>{
    ipcMain.on('keyword',(event,arg)=>{
        axios.get(`https://suggestqueries.google.com/complete/search?ds=yt&client=firefox&hjson=t&q=${arg}&alt=json`)
        .then(res=>{
            event.sender.send('suggetData',res.data[1])
        })
    })
}