// Initial variables for frames
var mediaSpeed = "";
var vidTimeout = "";
var mediaCheck = "";
targets = [];
var stop;

// strip down list of vid resources found to avoid adding listeners twice
const removeVal = (value, arr) => {
  while (arr.includes(value)) {
    arr.splice(arr.indexOf(value), 1);
  }
  return arr;
};

//function to add listeners to all frames with media elements
const mediaListener = (targets) => {
  // add the listener
  window.addEventListener("message", (e) => {
    // try to get command sent
    try {
      command = JSON.parse(e.data);
      // if relevant carry out the action assigned.
      if (command.message == "startExtension") {
        extensionState = command.state;
        mediaSpeed = extensionState["vidspeed"];
        stop = 0;
        vidTimeout = vidChange(targets, mediaSpeed);
      } else if (command.message == "stopExtension") {
        stop = 1;
        mediaSpeed = 1;
        clearTimeout(vidTimeout);

        vidTimeout = vidChange(targets, mediaSpeed);
      } else if (command.message == "speedChange") {
        extensionState = command.state;
        mediaSpeed = extensionState["vidspeed"];
        clearTimeout(vidTimeout);
        vidTimeout = vidChange(targets, mediaSpeed, true);
      } else {
      }
    } catch {}
  });
};

// loop through all elements and change the playback speed
const vidChange = (targets, speed) => {
  //update the playback speeds
  try {
    targets.forEach((el) => {
      el.playbackRate = speed;
    });
  } catch (error) {}
  // deal with if stop signal has been sent message listener
  if (stop == 1) {
    clearTimeout(vidTimeout);
    vidTimeout = "";
    stop = 0;
  }
  // if no stop signal call self again in 300 ms
  else {
    setTimeout(() => {
      vidTimeout = vidChange(targets, mediaSpeed);
    }, 300);
  }
};

// Add this code to all frames if(true)
if (true) {
  mediaCheck = setInterval(() => {
    newEls = [];
    auds = document.querySelectorAll("audio");
    vids = document.querySelectorAll("video");
    if (auds) {
      try {
        auds.forEach((el) => {
          newEls.push(el);
        });
      } catch (error) {}
    }

    if (vids) {
      try {
        vids.forEach((el) => {
          newEls.push(el);
        });
      } catch (error) {}
    }

    newEls.forEach((el) => {
      targets.includes(el) ? removeVal(el, newEls) : null;
    });

    newEls ? mediaListener(newEls) : null;
    newEls ? targets.push(...newEls) : null;
  }, 1500);
}
