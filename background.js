function newWindow(){

chrome.tabs.create({
   url:"speed_reader.html",
   active: false     
},function(tab){
chrome.windows.create({
        tabId: tab.id,
        type: 'popup',
        focused: true})})
        
}




function sendData(){
    console.log('data requested');
}




chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

    // var header1 = document.getElementsByTagName('h1')[0].textContent;

    console.log(request.data)

    sendResponse("titties")
    console.log('message received')
    // window.alert(request.data)
    
    } );






// add listeners to extension tab
document.getElementById('open_reader').addEventListener('pointerdown',()=>{
        newWindow();
});


// listeners to show playback speeds in UI
let videoRange = document.getElementById('video_range');

videoRange.addEventListener('change',()=>{
    document.getElementById('show_vid').innerHTML = Number(videoRange.value).toFixed(2);

})

let audioRange = document.getElementById('audio_range');

audioRange.addEventListener('change',()=>{
    document.getElementById('show_aud').innerHTML = Number(audioRange.value).toFixed(2);

})

// // listeners to hide and show the controls for video and audio
// els = document.querySelectorAll('.flippable').forEach((element)=> {element.addEventListener('pointerdown',(e)=>{
//     console.log(e.target.parentNode.querySelectorAll('.flippable').length);

//     e.target.parentNode.querySelectorAll('.flippable')[0].classList.toggle('hidden');
//     e.target.parentNode.querySelectorAll('.flippable')[1].classList.toggle('hidden');

//     // e.target.nextElementSibling.classList.toggle('hidden');
// })})