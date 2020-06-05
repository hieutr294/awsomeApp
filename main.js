const {app,BrowserWindow,ipcMain,dialog} = require('electron')
var searchController = require('./controller/handleSearch')
function boot(){
    let win = new BrowserWindow({
        width:400,
        height:500,
        webPreferences:{
            nodeIntegration: true
        }
    })
    win.loadFile('./view/index.html')
}
searchController.getAutoComplteData()

app.whenReady().then(boot)