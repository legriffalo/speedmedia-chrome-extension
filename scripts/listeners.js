// register the handler to doc Must be removed between instances
document.addEventListener('keydown', doc_keyUp, true);

// initialize the new event by adding a listener to doc
document.addEventListener('pointerup', detectDoubleTap(500));

// listeners to adjust words per minute
document.getElementById('wpm_up').addEventListener('pointerdown',()=>{
    changeWPM(10);
  });
document.getElementById('wpm_down').addEventListener('pointerdown',()=>{
    changeWPM(-10);
  });

// allow custom wpm to be input in text box
document.getElementById("wpm-speedia").addEventListener("change",(e)=>{
    // extensionState.wordsperminute = e.target.value;
    wpm = Number(e.target.value)
    updateExtensionState({"wordsperminute":wpm},"sent by reader speed hotkey");
    !reader? null: playReader(wpm);     
  });

// section headers are buttons that open and close reading, video and audio
var headings = document.getElementsByClassName("section_header");

for(let i = 0;i<headings.length;i++){
    headings[i].addEventListener('pointerdown',(e)=>{
    el = document.getElementById(e.target.dataset.target)
    el.classList.toggle('hidden');
  })
};

// Make playback speeds update 
// listener to show playback speeds in UI
var videoRange = document.getElementById('video_range-speedia');

// clean out and move to preload .js?
videoRange.addEventListener('change',(e)=>{
  document.getElementById('show_vid').innerHTML = Number(videoRange.value).toFixed(2);
  updateExtensionState({"vidspeed":Number(videoRange.value)}, "sent by speed knob")
  window.postMessage(`{"message":"speedChange","state":${JSON.stringify(extensionState)}}`,"*")

  // messaging to update play speed
  iFrames.forEach((el)=>{
    // console.log("trying to send start message to ", el)
    el.contentWindow.postMessage(`{"message":"speedChange","state":${JSON.stringify(extensionState)}}`,"*")});
});


helper = document.getElementById("helperbutton11925");
helper.addEventListener("pointerdown", (e)=>{
  sendMessageExtension("help","")
})