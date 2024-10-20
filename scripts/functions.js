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

// initialises extension search and sets up ui
function initialiseExtension(state){
    extensionState = state;
    // set extesnion state to allow quicker re-use and for extension to be picked up by subframes in same domain
    localStorage.setItem("extensionState",JSON.stringify(extensionState));
    // set visual properties of the extension
    box.style.position = "fixed";
    box.style.top = "0px"
    box.style.left = "0px"
    box.style.transform = "translate(" + state.x + "px ," + state.y + "px)";
    document.getElementById('wpm-speedia').value = state.wordsperminute;
    document.getElementById("video_range-speedia").value = state.vidspeed;
    document.getElementById("show_vid").innerHTML = Number(state.vidspeed).toFixed(2);
    
    setTimeout(()=>{
      box.style.opacity = "1";
      
    },100)
}

// add check for if controls elements are being used
// disables the drag and drop when control sliders are grabbed
function controls(e){
    // console.log(e.target.classList)
    cl = e.target.classList;
    return cl.contains("controls")
}

// function to change words per minute
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
            // console.log(data)
          }
        }
      }
    }
    catch(error){
      // console.log(error.message);
      }
    return data 
}

// handle hotkeys
function doc_keyUp(e) {
    extCommand = false;
    keyLog.splice(0,1);
    keyLog.push(e.code);
    // clear out key log to stop spaced out presses triggering anything
    setTimeout(()=>{keyLog=["",""];},500);

    // increase words per minute
    if (e.ctrlKey && e.shiftKey && e.code === 'ArrowUp') {
      extCommand = true;
      changeWPM(10);
    }

    // decrease words per minute
    if (e.ctrlKey && e.shiftKey && e.code === 'ArrowDown') {
      extCommand = true;
      changeWPM(-10);
    }

    // decrease media playback speed
    if (e.ctrlKey && e.shiftKey && e.code === 'ArrowLeft') {
      extCommand = true;
      document.getElementById("video_controls").classList.remove("hidden")
      var val = Number(document.getElementById("video_range").value);
      document.getElementById("video_range").value = val - 0.05; 
      var ev = new Event("change");
      document.getElementById("video_range").dispatchEvent(ev);
    }

    // increase media playback speed
    if (e.ctrlKey &&e.shiftKey && e.code === 'ArrowRight') {
      extCommand = true;
      document.getElementById("video_controls").classList.remove("hidden");
      var val = Number(document.getElementById("video_range").value);
      document.getElementById("video_range").value = val + 0.05; 
      var ev = new Event("change");
      document.getElementById("video_range").dispatchEvent(ev);
      }

    // reader start new from clipboard
    if (e.ctrlKey && e.shiftKey && keyLog[0]=="Space" && keyLog[1]=="Space"){
      extCommand = true;

        //play last read
        getClip().then((result)=>{
        // console.log(result);
        extensionState.lastread = result;
        updateExtensionState({"lastread":result}, "sent by rs hotkey");
        // open reader and play 
        document.getElementById("speed_reader-speedia").classList.remove('hidden');
        i = 0;
        playReader(extensionState.wordsperminute);
      })
    }

    // reader start/pause
    if (e.ctrlKey && e.code === "Space"){
      extCommand = true;

      if(reader == ''){
        document.getElementById("speed_reader-speedia").classList.remove('hidden');
        stop();
        playReader(extensionState.wordsperminute);
      }
      else{
        console.log("keyboard sent pause command", reader )
        pause();
      }
    }
    // opening the help and controls
    if (e.ctrlKey && e.shiftKey && e.code==="KeyH"){
      extCommand = true;

      //play last read
      sendMessageExtension("help","");
    }
    if(extCommand){
      e.preventDefault();
      e.stopPropagation();

    }
    else{}
}


