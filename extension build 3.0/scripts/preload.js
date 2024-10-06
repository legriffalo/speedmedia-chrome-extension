// check it is loaded in to host page, expect it to be at top of console
// should be the first script in 
console.log("loading from preload.js");

postMessage("go")
// postMessage("{playerPlaybackSpeed = 4}")

var base = document.createElement; // A backup reference to the browser's original document.createElement
var videoElementsMade = []; // Array of video/audio elements made by spotify's scripts 
var allElementsMade = []; // catch all elements for analysis/debugging
var messageTraffic = []; // track DOM key words to decide which elements to save references to
var iframeElementsMade = []; // track iframes made

/* Replacing the DOM's original reference to the browser's createElement function */
document.createElement = function(message) {
	// console.log('bob')
	/* base.apply is calling the backup reference of createElement with the arguments sent to our function and assigning it to our variable named element */
	var element = base.apply(this, arguments); 
	allElementsMade.push(element);
	messageTraffic.push(message);

	// Check the first argument sent this is the type of element DOM should create. e.g div/vieo etc
	// ignores the many document.createElement('div'), document.createElement('nav'), ect...
	if(message == 'video' || message == 'audio'){ // Checking if host scripts are making a video or audio element */
		videoElementsMade.push(element); // Add a reference to the element in our array.
	}
	// check if iframes have been made.
	if(message =='iframe'){
		iframeElementsMade.push(element); // Add a reference to the element in our array.
	}
	return element /* return the element and complete the loop so the page is allowed to be made */
};

// check in with initial elements found
console.log("dynamic vids", videoElementsMade);
console.log("all dynamic els",allElementsMade);
console.log("dynamic iframes",iframeElementsMade);


var extensionState = {};


function findDynamicIframeElements(iframeElementsMade){
	console.log("finding Iframes vid and audio")
	console.log(document.getElementsByTagName("iframe"))
	for(let el of iframeElementsMade){
		console.log(el)
		try{
			console.log("accessing", el.src)

			let audio = el.contentWindow.document.querySelectorAll("audio");
			console.log("audio is ", audio)
			let video = el.contentWindow.document.querySelectorAll("video");
			console.log("video is ", video)

			let media = [...audio].concat([...video]);	
			console.log("media elements are:", media );
		}
		catch(error){console.log("problem with searching iframes",error)}
	}
}

function updateNormalElements(){
	let playRate = extensionState.vidspeed
	// try to update videos
	let vids =  document.querySelectorAll("video");
	console.log(vids, "these are all vids on the page")
	// check if try block is needed
	for(let i = 0; i<vids.length;i++){
		vids[i].playbackRate = playRate;
		console.log(vids[i])
	  }



	let auds =  document.querySelectorAll("audio");

	try{

		for(let i = 0; i<vids.length;i++){
		  vids[i].playbackRate = playRate;
		  console.log(vids[i])
		  console.log("fixing",vids[i])
		}
	  }
	  catch(error){console.log("no vids")}
	  // try to update 






	  try{
		for(let i = 0; i<auds.length;i++){
	
		  auds[i].playbackRate = playRate;
		  console.log(auds[i])
		  console.log("fixing", auds[i])
		}
	  }
	  catch(error){console.log("no auds")
	
	  }
	
	  try{
		// make it loop
		let iauds = document.querySelectorAll("iframe")[0].contentWindow.document.querySelectorAll("audio");
	    console.log("iframe audio is",iauds)
		for(let i = 0; i<iauds.length;i++){
	
		  iauds[i].playbackRate = playRate;
		  console.log(iauds[i])
		}}
	
		catch{console.log("no iauds")}

	try{
		// make it loop
		let ivids = document.querySelectorAll("iframe")[0].contentWindow.document.querySelectorAll("video");
		console.log("iframe video is",ivids)
		for(let i = 0; i<ivids.length;i++){
	
			ivids[i].playbackRate = playRate;
			console.log(ivids[i])
		}}
		catch(error){console.log("no ivids",error)}

		console.log(document.getElementsByTagName("iframe")[0])

	  
};





function tryLoop(){
    console.log("updating and finding elements")
	try{
		extensionState = JSON.parse(localStorage.getItem("extensionState"));
		videoElementsMade.forEach((el)=>{el.playbackRate = Number(extensionState.vidspeed)})
		console.log("updating the normies")
		updateNormalElements();
		// console.log("finding the iframe embedded content")
		// findDynamicIframeElements();

		}
	catch(error){
		console.log("no luck", error)
	}
	setTimeout(tryLoop, 10000)
}


// /* When the page is loaded completely... */
window.onload = ()=> {
    // let n = document.createTextNode("yo its mee dick face")
	// document.body.appendChild(n) 
    console.log("host page is loaded")
	// findIframeElements();
	// Update loop, turn on to make spotify/soundcloud etc work
	// tryLoop();
}
	

// function that will take over from the loop
// function updateplaybackRates(){
// 	console.log("triggered code in preload file")
// 	findIframeElements();

// };

console.log("playbackRates is defined")

// 	function validateAndChangeSpeed(value){ 
// 		var val = parseFloat( value || (input.value / 100)); /* val must be in format 0.0625 - 16.0 https://stackoverflow.com/a/32320020 */
// 		if(!isNaN(val)){ /* check if val is a number */
// 			changeSpeed(val);
// 		}
// 	}
	
// 	function changeSpeed(val) {
// 		for(var i = 0; i < VideoElementsMade.length; i++){ /* change speed for all elements found (i havent seen this be more than 1 but you never know) */
// 			VideoElementsMade[i].playbackRate = val; /* set the playback rate here */
// 			if(val != lastSpeed){ /* update the lastSpeed if the speed actually changed */
// 				lastSpeed = val;
// 				setStoredSpeed(val);
// 			}
// 		}
// 	}
	




// //recursive update loop to ensure stupid spotify doesn't bust anything!

// 	function timeout() 
//{ /* This function is called by itself over and over */
// 		if(document.getElementById('speed-extension-input') == null) /* check if our input element doesnt exist */
// 		{
// 			try {
// 				document.getElementsByClassName('now-playing-bar__right')[0].appendChild (input); /* make our input exist on page */
// 			}catch{
// 				setTimeout(timeout, 100);/*now-playing-bar__right doesnt exist yet so lets try again in 100ms*/
// 				return;
// 			}
// 		}
// 		setTimeout(function () { /* setTimeout is a delayed call(500 milliseconds) to the code below */
// 			try {
// 				validateAndChangeSpeed(lastSpeed); /* this is in a try/catch because if an error happens timeout wouldnt be called again. */
// 			}catch{
				
// 			}
// 			timeout(); /* call timeout again which starts the loop and eventually it will come back here */
// 		}, 500); /* 500ms */
// 	}
	
// 	timeout(); /* starts the loop to check and create our inputbox and to set the playback speed without having to mess with input box(by refreshing and having it load from cookie) */
// 	/* sometimes playbackRate is set back to 1.0 by spotify's code so timeout just ensures it goes the speed the user desires */
// };







// /* ======== End of code string literal ======== */
// var script = document.createElement('script'); /* Create our dummy script to be inserted with our code variable  */
// script.textContent = code; /* insert our code as the contents of the script */
// document.body.appendChild(script); /* make our script exist on the page as, hopefully, the first script to execute. */
// (document.head||document.documentElement).appendChild(script); /* appends script again(not good practice) as close to top as possible */
// script.remove(); /* idk why i do this */