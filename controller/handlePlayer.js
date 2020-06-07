const {ipcMain} = require('electron')
const ytdl = require('ytdl-core')
module.exports.receiveSelectItem = ()=>{
    ipcMain.on('selectItem',(event,arg)=>{
        console.log(arg)
        ytdl.getInfo(arg.id,(err,info)=>{
            console.log(ytdl.filterFormats(info.formats,'audioonly')[0].url)
            event.sender.send('url',{
                url:ytdl.filterFormats(info.formats,'audioonly')[0].url,
                title:arg.title,
                author:arg.author,
                img:arg.img
            })
        })
    })
}