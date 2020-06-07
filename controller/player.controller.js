const {ipcRenderer} = require('electron')
const info = document.getElementById('info')
const btn = document.getElementById('loopBtn')
var WaveSurfer = require('wavesurfer.js');

ipcRenderer.on('url',(event,arg)=>{
    let temp = 1
    let img = document.createElement('img')
    let title = document.createElement('p')
    let author = document.createElement('p')
    
    img.src = arg.img
    img.width = 168
    img.height = 94

    title.innerHTML=arg.title
    author.innerHTML=arg.author

    info.appendChild(img)
    info.appendChild(title)
    info.appendChild(author)

    btn.onclick=()=>{
        temp+=1
    }

    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        backend:'MediaElement',
        mediaControls:true,
        mediaType:'audio',
        responsive:true
    })
    wavesurfer.load(arg.url);

    wavesurfer.on('ready', function () {
        wavesurfer.play();
    })
    if(!wavesurfer.isPlaying()){
        wavesurfer.play()
    }
    if(temp==2){
        console.log(temp)
        if(!wavesurfer.isPlaying()){
            wavesurfer.play()
        }
    }else{
        temp=1
    }

})