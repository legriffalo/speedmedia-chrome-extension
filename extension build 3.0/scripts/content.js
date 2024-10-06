//////////////////////////////////////////////////////////////////////////////////////////////////////////
// version  check for debugging
console.log('ver 14.0')

// works for frames in same domain =) 
// function feAdjustVideoPlaybackInFrame(frame, playbackRate) {
//   console.log("ran fead function")
//   var i;
//   for (i=0; i<frame.frames.length; i++) {
//     try {
//       feAdjustVideoPlaybackInFrame(frame.frames[i], playbackRate);
//       frame.frames[i].document.querySelector('video').playbackRate = playbackRate;
//     }
//     catch(e) {console.log(e)};
//   }
// }
// feAdjustVideoPlaybackInFrame(window, 3);









// listener for double click and tap events
function detectDoubleTap(doubleTapMs) {
  let timeout, lastTap = 0
  return function detectDoubleTap(event) {
    const currentTime = new Date().getTime()
    const tapLength = currentTime - lastTap
    if (0 < tapLength && tapLength < doubleTapMs) {
      event.preventDefault()
      const doubleTap = new CustomEvent("doubletap", {
        bubbles: true,
        detail: event
      })
      event.target.dispatchEvent(doubleTap)
    } else {
      timeout = setTimeout(() => clearTimeout(timeout), doubleTapMs)
    }
    lastTap = currentTime
  }
}
// initialize the new event by adding a listener to doc
document.addEventListener('pointerup', detectDoubleTap(500));
// load the URL for icon image
var ico = chrome.runtime.getURL("images/icon48.png");

/////////////////////////////// Inject the pop up in to the host page //////////////////////////////////
// inject the pop up on the page so it can be visible
document.body.insertAdjacentHTML("afterend", `
<div  class = 'selectDisable' id= 'popout11925'>
    <div class = 'header123'>
        <img src = '${ico}'>
    </div>


    <div id = "reading" class = "section">
        <h4 data-target = "speed_reader" class = "section_header">Read</h4>
        <div id = "speed_reader" class ="hidden">
            <div id = "speed_settings">
              <button id = "wpm_down"><</button> 
              <input type ="text" id = "wpm"  maxlength="3" class = "controls" size = "4" placeholder = "200">
              <button id = "wpm_up">></button>
            </div>
            <div id = "reader_window">
                <p><span id ="word_show">read here</span></p>
           </div>
           <div class = "buttons">
               <button id = 'play'>play</button>
               <button id = 'pause'>pause</button>
               <button id = 'restart'>restart</button>
           </div>
        </div>

    </div>

    <div id = "video" class = "section">
        <h4 data-target = "video_controls" class = "section_header">Media</h4>
        <div id = "video_controls" class ="hidden">
            <input type="range" min="0" max="5" value="1" step = "0.05" class=" controls slider" id="video_range"> <span id = "show_vid">1.00</span>

        </div>

    </div>
        
</div>`)
////////////////////////////////////////////////////////////////////////////////////////////////////////

var extensionState = {};

function initialiseExtension(state){
  extensionState = state;
  console.log(state, extensionState)
  localStorage.setItem("extensionState",JSON.stringify(extensionState));
  console.log("set storage on local =)")
  box.style.position = "fixed";
  box.style.top = "0px"
  box.style.left = "0px"
  box.style.transform = "translate(" + state.x + "px ," + state.y + "px)";
  document.getElementById('wpm').value = state.wordsperminute;
  document.getElementById("video_range").value = state.vidspeed;
  document.getElementById("show_vid").innerHTML = Number(state.vidspeed).toFixed(2);
  // set playback values
  // could use custom doc listener on window/doc to send vals to other script or local Storage smuggle? 
}
// try to get Extension state and save to variable
getExtensionState().then((result)=>{
  //  console.log(extensionState)
   extensionState = result;
  //  console.log(extensionState)
  // extensionState = JSON.parse(result);
  // console.log("it's finally arrived fuck me", result)
  initialiseExtension(extensionState);
}).then(
  setTimeout(()=>{console.log("proof the variable was set", extensionState)},500)
);
//////////////////////////////////// Make drag and drop functionality work//////////////////////////////
// get the width of the scroll bar
var scrollbarWidth = window.innerWidth - document.body.offsetWidth;
// variable box is linked to id of popup element 
var box = document.getElementById("popout11925");

var diff = {};

// function to get the position x,y coords of box
var getBoxPos = function() {
  return {
    x: box.getBoundingClientRect().x,
    y: box.getBoundingClientRect().y
  };
};

// find the difference between the mouse and the edge of the popup box
var calcDiff = function(x, y) {
  var boxPos = getBoxPos();
  diff = {
    x: x - boxPos.x,
    y: y - boxPos.y
  };
  // console.log(diff)
};

// make popup move when mouse moves turned on and off by click listeners
var handleMouseMove = function(event) {
    event.preventDefault();
    // console.log(event.y)
  var x = event.x;
  var y = event.y;
  x -= diff.x;
  y -= diff.y;

// checking bumping edge of the screen
//   msg = x<0? 'hit left': x > window.innerWidth - box.getBoundingClientRect().width ? 'hit right':null;
//   console.log(msg)
  x = x<0? 0: x+scrollbarWidth > window.innerWidth - box.getBoundingClientRect().width ?  window.innerWidth - box.getBoundingClientRect().width-scrollbarWidth:x;
  y = y<0? 0: y > window.innerHeight - box.getBoundingClientRect().height ?  window.innerHeight - box.getBoundingClientRect().height:y;

  box.style.position = "fixed";
  box.style.top = "0px"
  box.style.left = "0px"
  box.style.transform = "translate(" + x + "px ," + y + "px)";
};


// add check for if controls elements are being used
// disables the drag and drop when control sliders are grabbed
function controls(e){
    // console.log(e.target.classList)
    cl = e.target.classList;
    return cl.contains("controls")

}

// track touch events and start the drag and drop for tablets
box.addEventListener("touchstart", function(e) {
    e.preventDefault();
//   check if control
    if(!controls(e)){
    calcDiff(e.touches[0].clientX, e.touches[0].clientY);
    box.addEventListener("pointermove", handleMouseMove, true);
    }
});

// handle clicks from mouse
box.addEventListener("mousedown", function(e) {
  // check if control
  if(!controls(e)){
  calcDiff(e.x, e.y);
  box.addEventListener("pointermove", handleMouseMove, true);
  }
});

// listen for touch stop and mouseup
box.addEventListener("pointerup", function(e) {
//   console.log("onmouseup");
    updateExtensionState({"x":e.x - diff.x,"y":e.y - diff.y}, "sent by end of mouse move");
    box.removeEventListener("pointermove", handleMouseMove, true);
});

// if drag speed exceeds box movement speed (mouse escapes popup)
// stop the drag event
box.addEventListener("pointerleave", function(e) {
//   console.log("onmouseup");
// console.log(e.target, this)
  if(e.target!==this){
    console.log('not removing listener due to sub element')
  } 
  else{
    // console.log('remove listener')
    box.removeEventListener("pointermove", handleMouseMove, true)
};
});

window.addEventListener("resize",(e)=>{
    //get popup position
    let {x,y} = getBoxPos();
    console.log("position",x,y)
    x = x+scrollbarWidth > window.innerWidth - box.getBoundingClientRect().width ?  window.innerWidth - box.getBoundingClientRect().width-scrollbarWidth:x;
    y = y > window.innerHeight - box.getBoundingClientRect().height ?  window.innerHeight - box.getBoundingClientRect().height:y;
    updateExtensionState({"x":x,"y":y},"sent by screen resize");
    box.style.position = "fixed";
    box.style.top = "0px"
    box.style.left = "0px"
    box.style.transform = "translate(" + x + "px ," + y + "px)";

})

///////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////       Making controls work           //////////////////////////////

// section headers are buttons that open and close reading, video and audio
var headings = document.getElementsByClassName("section_header");
for(let i = 0;i<headings.length;i++){
  headings[i].addEventListener('pointerdown',(e)=>{
    el = document.getElementById(e.target.dataset.target)
    el.classList.toggle('hidden');
  })
};

// function to change wpm
function changeWPM(i){
  // change wpm variable?
  let wpm = extensionState.wordsperminute + i;
  extensionState.wordsperminute = wpm;

  document.getElementById('wpm').value = wpm;
  //check if reader is running and re-calibrate if it is
  updateExtensionState({"wordsperminute":wpm},"sent by reader speed hotkey")
  !reader? null: playReader(wpm);
  // check not disruptive     
  return 1
}

// listeners to adjust words per minute
document.getElementById('wpm_up').addEventListener('pointerdown',()=>{
  changeWPM(10);
})
document.getElementById('wpm_down').addEventListener('pointerdown',()=>{
  changeWPM(-10);
})

document.getElementById("wpm").addEventListener("change",(e)=>{
  // extensionState.wordsperminute = e.target.value;
  wpm = Number(e.target.value)
  updateExtensionState({"wordsperminute":wpm},"sent by reader speed hotkey");
  console.log("wpm changed by input")
  
  !reader? null: playReader(wpm);     


})

// Make playback speeds update 
// listener to show playback speeds in UI
var videoRange = document.getElementById('video_range');

// clean out and move to preload .js?
videoRange.addEventListener('change',(e)=>{
  document.getElementById('show_vid').innerHTML = Number(videoRange.value).toFixed(2);


//should remove when done
  // let vids =  document.querySelectorAll("video");

  // let auds =  document.querySelectorAll("audio");
  console.log("listener is changing vid/audio speed - old method ");

  // consolidate all video playback methods in to a single method
  // updateplaybackRates();



  // try{
  //   for(let i = 0; i<vids.length;i++){
  //     vids[i].playbackRate = Number(videoRange.value);
  //     console.log(vids[i])
  //     console.log(document.querySelector("video"))
  //   }
  // }
  // catch{console.log("no vids")}

  // try{
  //   for(let i = 0; i<auds.length;i++){

  //     auds[i].playbackRate = Number(videoRange.value);
  //     console.log(auds[i])
  //     console.log(document.querySelector("audio"))
  //   }
  // }
  // catch{console.log("no auds")

  // }

  // try{
  //   let iauds = document.getElementsByTagName("iframe")[0].contentWindow.document.querySelectorAll("audio");

  //   for(let i = 0; i<iauds.length;i++){

  //     iauds[i].playbackRate = Number(videoRange.value);
  //     console.log(iauds[i])
  //   }}

  //   catch{console.log("no iauds")}
  
/// this all should be in function in preload

  updateExtensionState({"vidspeed":Number(videoRange.value)}, "sent by speed knob")
})

////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////           Hot keys                  //////////////////////////////

// find text data from clipboard and send to reader
async function getClip(){
  try{
    let clipContents = await navigator.clipboard.read();
    for (const item of clipContents) {
      for (const mimeType of item.types) {
        if (mimeType === "text/plain") {
          const blob = await item.getType("text/plain");
          const blobText = await blob.text();
          data = blobText;
          console.log(data)
        }
      }
    }
  }
  catch(error){
    console.log(error.message);
    }
  return data 
}

///////////// add hotkeys //////////////////
// log for keys pressed
keyLog = ["",""];
// define a handler
function doc_keyUp(e) {

  keyLog.splice(0,1);
  keyLog.push(e.code);
  // clear out key log to stop spaced out presses triggering anything
  setTimeout(()=>{keyLog=["",""];},500);

  if (e.ctrlKey && e.code === 'ArrowUp') {
      // call your function to do the thing
      changeWPM(10);
      console.log('hit up key')  
    }

  if (e.ctrlKey && e.code === 'ArrowDown') {
    changeWPM(-10);
    console.log('hit down key')  
  }

  if (e.ctrlKey && e.code === 'ArrowLeft') {
    document.getElementById("video_controls").classList.remove("hidden")
    var val = Number(document.getElementById("video_range").value);
    document.getElementById("video_range").value = val - 0.05; 
    var ev = new Event("change");
    document.getElementById("video_range").dispatchEvent(ev);
  }
  // turn up media playback speed
  if (e.ctrlKey && e.code === 'ArrowRight') {
      document.getElementById("video_controls").classList.remove("hidden");
      var val = Number(document.getElementById("video_range").value);
      document.getElementById("video_range").value = val + 0.05; 
      var ev = new Event("change");
      document.getElementById("video_range").dispatchEvent(ev);
    }

  // reader start new from clipboard
  if (e.ctrlKey && e.shiftKey && keyLog[0]=="Space" && keyLog[1]=="Space"){
      //play last read
      getClip().then((result)=>{
      console.log(result);
      extensionState.lastread = result;
      updateExtensionState({"lastread":result}, "sent by rs hotkey");
      // open reader and play 
      document.getElementById("speed_reader").classList.remove('hidden');
      i = 0;
      playReader(extensionState.wordsperminute);
    })
  }
  // reader start/pause
  if (e.ctrlKey && e.code === "Space"){
    if(reader == ''){
      document.getElementById("speed_reader").classList.remove('hidden');
      playReader(extensionState.wordsperminute);
    }
    else{
      clearInterval(reader);
      reader = '';
    }
  }
  // opening the help and controls
  if (e.shiftKey && e.code==="KeyH"){
    //play last read
    console.log("try to open settings")
    sendMessageExtension("help","");
  }
  else{}
}

// register the handler to doc Must be removed between instances
document.addEventListener('keydown', doc_keyUp, false);
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////    Make the reader work             //////////////////////////////

var reader = '';
var i = 0;

//stop the reader and reset
function stop(){
  clearInterval(reader);
  i = 0;
  reader = '';
}
//pause the reader
function pause(){

  clearInterval(reader);
  reader = '';
  console.log(!reader);
}
// play speed reader
function playReader(y){
  // clean up text
  x = extensionState.lastread;
  x = x.split(' ')

  // add regex commands here?
  for(var z of x){
    console.log(y);
    // get rid of 
    z = z.replace()
  }
  console.log(x);
  
  // x = extensionState.lastread.split(' ');
  clearInterval(reader);
  reader = setInterval(()=>{
      // console.log(x.length)
      document.getElementById('word_show').innerHTML = x[i];
      i<x.length-1? i++ :stop();
      
    },60000/y)
};
//////////// make speed reader buttons work ////////////
// clicked the play button
document.getElementById('play').addEventListener('pointerdown',()=>{
  //send a mesage
  playReader(extensionState.wordsperminute);
});
// play double tapped
document.getElementById('play').addEventListener('doubletap',()=>{
  //send a mesage
  console.log("double tapped bebe");
  getClip().then((result)=>{
   console.log(result);
   extensionState.lastread = result;
   updateExtensionState({"lastread":result}, "copy event");
   i = 0;
  playReader(extensionState.wordsperminute)
  });
});
// pause button clicked
document.getElementById('pause').addEventListener('pointerdown',()=>{
  console.log('pausing reader');
  pause();
})
// restart button clicked
document.getElementById('restart').addEventListener('pointerdown',()=>{
  console.log('stopping reader');
  stop();
  document.getElementById('word_show').innerHTML = extensionState.lastread.split(' ')[i];
})

//////////////////////////////////////// Messaging between tabs ////////////////////////////////////////

// function to send updated state info to extension to be stored
function updateExtensionState(updates, message){// function to send updated state info to extension to be stored

  //  console.log("sending state update")
  // update the state with requested new values
  let keys = Object.keys(updates)

  for(let i = 0;i<keys.length;i++){
    // console.log(keys[i]);
    extensionState[keys[i]] = updates[keys[i]];
    // console.log("sending data", extensionState)
  }
  localStorage.setItem("extensionState",JSON.stringify(extensionState))
  sendMessageExtension("sent-state-data",extensionState)
  console.log(extensionState, message)
}
// function to request state from extension
async function getExtensionState(){
  // console.log("requesting last state from extension")
  var resp = await sendMessageExtension("request-state-data","request")
  // console.log("did this jump ahead in the queue?")
  // console.log("response was returned", resp)
  //add a return
  return resp
}

////////////////////// Messaging between popup and chrome extension service worker//////////////////////

// sent-state-data -- send data from popup to extension and store
//request-state-data -- send data from extension to popup from storage
async function sendMessageExtension(message,data){
  resp = 'none'
  await chrome.runtime.sendMessage({"message":message,
                                    "data":data
                                  })
  .then((response) => {
          console.info("state information sent to extension and got %s in response", response)
          resp = response

  })
  .catch((error) => {
          console.warn("Popup could not send message to extension error was %s", error)
      })
    
      return resp
  }

  // innacivated but ready to listen for messages coming other way?
// chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
//   console.log(request.data)
//   console.log('message received')
//   // console.log(cont);
//   console.log(sender);
//   sendResponse(JSON.stringify(extensionState))
//   } );

////////////////////////////////////////////////////////////////////////////////////////////////////////
