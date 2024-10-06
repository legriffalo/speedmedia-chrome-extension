// postMessage("i'm here mother fucker =)")
console.log("script injected"); 
console.log(document.location)
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




document.onload = ()=>{
console.log("scanning iframe for elements")
console.log("found vids", videoElementsMade)
console.log("found els", allElementsMade)

videoElementsMade.forEach((el)=>{
    console.log("found and el");
    el.playbackRate = 4

})

console.log("attempted speed change")
}

// // check in with initial elements found
// mes = `{'sender':'speediaiframe', 
//       'payload':{'videoElementsMade': ${videoElementsMade.join(' ')},
//                 'allElementsMade':${allElementsMade.join(' ')},
//                 'iframeElementsMade':${iframeElementsMade.join(' ')}}
//       }`


// postMessage(
//     String(mes)
// )


// window.addEventListener("message",
//     (e)=>{
//         if(e.origin=="https://www.dailymotion.com"){
//         console.log(e)
//         console.log(e.data)
//         }
//         if(e.data == "go"){
//             try{
                
//                 // extensionState = JSON.parse(localStorage.getItem("extensionState"));
//                 videoElementsMade.forEach((el)=>{
//                     console.log("found and el")
//                     el.playbackRate = 4

//                 })
//                 // console.log("updating the normies")
//                 // updateNormalElements();
//                 // console.log("finding the iframe embedded content")
//                 // findDynamicIframeElements();

// 		}
// 	catch(error){
// 		postMessage("no luck")
// 	}

//             }
//     else{}
//     }

// )