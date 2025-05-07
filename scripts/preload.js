// check it is loaded in to host page, expect it to be at top of console
// should be the first script in
var base = document.createElement; // A backup reference to the browser's original document.createElement
var videoElementsMade = []; // Array of video/audio elements made by spotify's scripts
var allElementsMade = []; // catch all elements for analysis/debugging
var messageTraffic = []; // track DOM key words to decide which elements to save references to

/* Replacing the DOM's original reference to the browser's createElement function */
document.createElement = function (message) {
  /* base.apply is calling the backup reference of createElement with the arguments sent to our function and assigning it to our variable named element */
  var element = base.apply(this, arguments);
  allElementsMade.push(element);
  messageTraffic.push(message);

  // Check the first argument sent this is the type of element DOM should create. e.g div/vieo etc
  // ignores the many document.createElement('div'), document.createElement('nav'), ect...
  if (message == "video" || message == "audio") {
    // Checking if host scripts are making a video or audio element */
    videoElementsMade.push(element); // Add a reference to the element in our array.
  }

  return element; /* return the element and complete the loop so the page is allowed to be made */
};

// check in with initial elements found

console.log("loading from preload.js");
// console.log("dynamic vids", videoElementsMade.length, videoElementsMade);

// setInterval(()=>{
// 	console.log("dynamic vids", videoElementsMade.length, videoElementsMade)
// 	}, 3000);
