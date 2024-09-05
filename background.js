let reading = document.getElementById('reading');
let video = document.getElementById('video');
let audio = document.getElementById('audio');


reading.addEventListener('pointerdown',()=>{
    window.alert('reading');
});

video.addEventListener('pointerdown',()=>{
    window.alert('video');
});

audio.addEventListener('pointerdown',()=>{
    window.alert('audio');
});


document.getElementsByTagName('body')[0].addEventListener('pointerdown',()=>{
    window.alert('p_clicked')
});


chrome.action.onClicked.addListener(async (tab) => {})