// This file generates the core elements and variable for the extension
// It runs in any page the extension is initialised in
console.log("ver 8.2 Speedia extension initialised");
// load the URL for icon image
var ico = chrome.runtime.getURL("images/icon48.png");
// variable for on/off
var on = 0;
// inject the pop up on the page so it can be visible
document.body.insertAdjacentHTML(
  "afterend",
  `
  
<div  class = 'selectDisable' id= 'popout11925' style= "opacity:0;">
    <div class = 'header123'>
        <img src = '${ico}'>
        <div id = "helperbutton11925">?</div>
    </div>
    <div id = "reading" class = "section">
        <h4 data-target = "speed_reader-speedia" class = "section_header">Read</h4>
        <div id = "speed_reader-speedia" class ="hidden">
            <div id = "speed_settings">
              <button id = "wpm_down"><</button> 
              <input type ="text" id = "wpm-speedia"  maxlength="3" class = "controls" size = "4" placeholder = "200">
              <button id = "wpm_up">></button>
            </div>
            <div id = "reader_window">
                <p><span id ="word_show">read here</span></p>
           </div>
           <div class = "buttons">
               <button id = 'play-speedia'>play</button>
               <button id = 'pause-speedia'>pause</button>
               <button id = 'restart-speedia'>restart</button>
           </div>
        </div>
    </div>
    <div id = "video" class = "section">
        <h4 data-target = "video_controls" class = "section_header">Media</h4>
        <div id = "video_controls" class ="hidden">
            <input type="range" min="0" max="5" value="1" step = "0.05" class=" controls slider" id="video_range-speedia"> <span id = "show_vid">1.00</span>

        </div>

    </div>
        
</div>`
);
// variable to store the main object
var box = document.getElementById("popout11925");
// Start extensions with an ampty object for state
var extensionState = {};
// try to get Extension state from Chrome storage and save to variable
getExtensionState()
  .then((result) => {
    // set the state variable
    extensionState = result;
    // Message all frames and start processes
    window.postMessage(
      `{"message":"startExtension","state":${JSON.stringify(result)}}`,
      "*"
    );
    iFrames = document.querySelectorAll("iframe");
    iFrames.forEach((el) => {
      console.log("trying to send start message to ", el);
      el.contentWindow.postMessage(
        `{"message":"startExtension","state":${JSON.stringify(result)}}`,
        "*"
      );
    });

    //initialise the extension
    initialiseExtension(extensionState);
  })
  .then(
    setTimeout(() => {
      console.log(
        "Speedia was initialised with these properties",
        extensionState
      );
    }, 500)
  );
// log for keys pressed
keyLog = ["", ""];
