////////////////////////////////////    Make the reader work             //////////////////////////////
// initial variable set 
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
}

// play speed reader
function playReader(y){
  // clean up text
  x = extensionState.lastread;
  x = x.split(' ');

  // add regex commands here?
  for(var z of x){
    // console.log(y);
    // get rid of 
    z = z.replace()
  }
  // console.log(x);
  
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
document.getElementById('play-speedia').addEventListener('pointerdown',()=>{
  //send a mesage
  playReader(extensionState.wordsperminute);
});
// play double tapped
document.getElementById('play-speedia').addEventListener('doubletap',()=>{
  //send a mesage
  // console.log("double tapped bebe");
  getClip().then((result)=>{
  //  console.log(result);
   extensionState.lastread = result;
   updateExtensionState({"lastread":result}, "copy event");
   i = 0;
  playReader(extensionState.wordsperminute)
  });
});
// pause button clicked
document.getElementById('pause-speedia').addEventListener('pointerdown',()=>{
  // console.log('pausing reader');
  pause();
})
// restart button clicked
document.getElementById('restart-speedia').addEventListener('pointerdown',()=>{
  // console.log('stopping reader');
  stop();
  document.getElementById('word_show').innerHTML = extensionState.lastread.split(' ')[i];
})