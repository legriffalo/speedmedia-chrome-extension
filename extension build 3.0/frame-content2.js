// check it is loaded in to host page, expect it to be at top of console
// should be the first script in 
console.log("loading from preload2.js");


const vidChange = ()=>{
	

	try{
		var vid = document.querySelectorAll("video");
		console.log(vid)
		vid.forEach((e)=>{
			console.log("changing", e)
			e.playbackRate = 2;})
		}

	catch{}

	setTimeout(vidChange,1000)
	}



window.onload = (e)=>{
	vidChange()
}
	

// console.log(document.location)


// var base = document.createElement; // A backup reference to the browser's original document.createElement
// var videoElementsMade = []; // Array of video/audio elements made by spotify's scripts 
// var allElementsMade = []; // catch all elements for analysis/debugging
// var messageTraffic = []; // track DOM key words to decide which elements to save references to
// var iframeElementsMade = []; // track iframes made

// /* Replacing the DOM's original reference to the browser's createElement function */
// document.createElement = function(message) {
// 	// console.log('bob')
// 	/* base.apply is calling the backup reference of createElement with the arguments sent to our function and assigning it to our variable named element */
// 	var element = base.apply(this, arguments); 
// 	allElementsMade.push(element);
// 	messageTraffic.push(message);

// 	// Check the first argument sent this is the type of element DOM should create. e.g div/vieo etc
// 	// ignores the many document.createElement('div'), document.createElement('nav'), ect...
// 	if(message == 'video' || message == 'audio'){ // Checking if host scripts are making a video or audio element */
// 		videoElementsMade.push(element); // Add a reference to the element in our array.
// 	}
// 	// check if iframes have been made.
// 	if(message =='iframe'){
// 		iframeElementsMade.push(element); // Add a reference to the element in our array.
// 	}
// 	return element /* return the element and complete the loop so the page is allowed to be made */
// };

// function findVids(){
// 	let a = document.getElementsByTagName("video");
// 	return a
// }
// // check in with initial elements found
// console.log("dynamic vids", videoElementsMade);
// console.log("all dynamic els",allElementsMade);
// console.log("dynamic iframes",iframeElementsMade);
// console.log("sent by iframe???")

// // /* When the page is loaded completely... */
// document.onload = ()=> {
//     // let n = document.createTextNode("yo its mee dick face")
// 	// document.body.appendChild(n) 
//     console.log("host iframe is loaded")
//     console.log(document.location)
    

// 	console.log("using find vids",findVids());
// 	// findIframeElements();
// 	// Update loop, turn on to make spotify/soundcloud etc work
// 	// tryLoop();
// 	videoElementsMade.forEach((el)=>{
// 		el.playbackRate = 3;
// 	})
// }

	

// // function that will take over from the loop
// // function updateplaybackRates(){
// // 	console.log("triggered code in preload file")
// // 	findIframeElements();

// // };

// console.log("playbackRates is defined")

// // 	function validateAndChangeSpeed(value){ 
// // 		var val = parseFloat( value || (input.value / 100)); /* val must be in format 0.0625 - 16.0 https://stackoverflow.com/a/32320020 */
// // 		if(!isNaN(val)){ /* check if val is a number */
// // 			changeSpeed(val);
// // 		}
// // 	}
	
// // 	function changeSpeed(val) {
// // 		for(var i = 0; i < VideoElementsMade.length; i++){ /* change speed for all elements found (i havent seen this be more than 1 but you never know) */
// // 			VideoElementsMade[i].playbackRate = val; /* set the playback rate here */
// // 			if(val != lastSpeed){ /* update the lastSpeed if the speed actually changed */
// // 				lastSpeed = val;
// // 				setStoredSpeed(val);
// // 			}
// // 		}
// // 	}
	




// // //recursive update loop to ensure stupid spotify doesn't bust anything!

// // 	function timeout() 
// //{ /* This function is called by itself over and over */
// // 		if(document.getElementById('speed-extension-input') == null) /* check if our input element doesnt exist */
// // 		{
// // 			try {
// // 				document.getElementsByClassName('now-playing-bar__right')[0].appendChild (input); /* make our input exist on page */
// // 			}catch{
// // 				setTimeout(timeout, 100);/*now-playing-bar__right doesnt exist yet so lets try again in 100ms*/
// // 				return;
// // 			}
// // 		}
// // 		setTimeout(function () { /* setTimeout is a delayed call(500 milliseconds) to the code below */
// // 			try {
// // 				validateAndChangeSpeed(lastSpeed); /* this is in a try/catch because if an error happens timeout wouldnt be called again. */
// // 			}catch{
				
// // 			}
// // 			timeout(); /* call timeout again which starts the loop and eventually it will come back here */
// // 		}, 500); /* 500ms */
// // 	}
	
// // 	timeout(); /* starts the loop to check and create our inputbox and to set the playback speed without having to mess with input box(by refreshing and having it load from cookie) */
// // 	/* sometimes playbackRate is set back to 1.0 by spotify's code so timeout just ensures it goes the speed the user desires */
// // };







// // /* ======== End of code string literal ======== */
// // var script = document.createElement('script'); /* Create our dummy script to be inserted with our code variable  */
// // script.textContent = code; /* insert our code as the contents of the script */
// // document.body.appendChild(script); /* make our script exist on the page as, hopefully, the first script to execute. */
// // (document.head||document.documentElement).appendChild(script); /* appends script again(not good practice) as close to top as possible */
// // script.remove(); /* idk why i do this */