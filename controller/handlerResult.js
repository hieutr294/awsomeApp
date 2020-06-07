const {ipcMain} = require('electron')

const axios = require('axios')
const cheerio = require('cheerio')

async function get(arg){
    var arrLink2 = []
    await axios.get(`https://www.youtube.com/results?search_query=${arg}`)
    .then(res=>{
        const $ = cheerio.load(res.data)
        let imgLink = []
        let arrLink = []
        let authors= []

        $('.yt-lockup-byline').map((i,el)=>{
            authors.push($(el).children().text())
        })

        $('.yt-thumb-simple').map((i,el)=>{
            if($(el).children().attr('src').includes('https')){
                imgLink.push($(el).children().attr('src'))
            }else{
                imgLink.push($(el).children().attr('data-thumb'))
            }
        })
    
        $('.yt-lockup-title').map((i,el)=>{
            arrLink.push({
                title:$(el).children().first().text(),
                id:$(el).children().attr('href').replace('/watch?v=',''),
                img:imgLink[i],
                author:authors[i]
            })
        })
        arrLink2.concat(arrLink)
    })
    return arrLink2
}
module.exports.getSearchData = ()=>{
    ipcMain.on('searchVal',(event,arg)=>{
        axios.get(`https://www.youtube.com/results?search_query=${arg}`)
        .then(res=>{
            const $ = cheerio.load(res.data)
            let imgLink = []
            let arrLink = []
            let authors= []
    
            $('.yt-lockup-byline').map((i,el)=>{
                authors.push($(el).children().text())
            })
    
            $('.yt-thumb-simple').map((i,el)=>{
                if($(el).children().attr('src').includes('https')){
                    imgLink.push($(el).children().attr('src'))
                }else{
                    imgLink.push($(el).children().attr('data-thumb'))
                }
            })
        
            $('.yt-lockup-title').map((i,el)=>{
                arrLink.push({
                    title:$(el).children().first().text(),
                    id:$(el).children().attr('href').replace('/watch?v=',''),
                    img:imgLink[i],
                    author:authors[i]
                })
            })
            event.sender.send('result',arrLink)
        })
    })
}