const {app,BrowserWindow,ipcMain,dialog} = require('electron')
var handleSearch = require('./controller/handleSearch')
var handlerResult = require('./controller/handlerResult')
var handlerPlayer = require('./controller/handlePlayer')
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

handleSearch.getAutoComplteData()
handlerResult.getSearchData()
handlerPlayer.receiveSelectItem()

app.whenReady().then(boot)