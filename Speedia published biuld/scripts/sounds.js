var extensionState = {};
var spotiTimeout = '';
var soundPlay = 0;

// loop to update play speeds, must loop as many platforms periodically reset playback speed to 1
function testLoop(refresh){
    // deal hidden elements, react/angular
    extensionState = JSON.parse(localStorage.getItem("extensionState"));
    if(soundPlay ==0){
        clearTimeout(spotiTimeout);
        spotiTimeout = ''
        videoElementsMade.forEach(
            (el)=>{
                el.playbackRate = 1.0;
                try{
                    el.defaultPlaybackRate = 1.0;
                }
                catch{}
            });
    }

    else {
        if(videoElementsMade.length>0 && soundPlay == 1 ){
            try{
                videoElementsMade.forEach(
                    (el)=>{
                        el.playbackRate = extensionState.vidspeed;
                        try{
                            el.defaultPlaybackRate = extensionState.vidspeed;
                        }
                        catch{}
                    })

                }
            catch(error){
                refresh = 1000;
            }
        spotiTimeout = setTimeout(()=>{testLoop(refresh)}, refresh)
        }
    }    
}

// on start signal
window.addEventListener("message",
    (e)=>{
        try{command = JSON.parse(e.data)

        if(command["message"] =="startExtension"){
            soundPlay = 1
            // turn on loop to update React and angular generated media
            spotiTimeout = testLoop(300)
        }

        if(command["message"] =="stopExtension"){
            // console.log("loop in sounds.js has been stopped")
            soundPlay = 0;
            }   
        }
        catch{}
    }
);

addEventListener("close", (event) => {
    try{
        if(
            videoElementsMade.length > 0){
            localStorage.setItem("prevs", "there were prevs")}
        else{
            // console.log(localStorage.getItem("prevs"))
        }
    }
    catch{
        console.log("no storage?")
    }

});