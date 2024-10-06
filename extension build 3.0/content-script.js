console.log('loading in media speed scripts')
// This script is loaded in as soon as the user commits an address 
//to the address bar effectively ensuring that this script is the 
// first thing that runs


// This allows us to smuggle in a script preload.js that will coopt 
// normal DOM control to allow us to keep tabs on how audio and video
// are being added to a page 

// This allows the extension to work properly on spotify, soundcloud, 
// podcatsing sites and most bs corporate training sites.


const loadScript = (filePath) => {
    const script = document.createElement('script')
    script.src = chrome.runtime.getURL(filePath) 
    script.type = 'module'
    document.head.appendChild(script)
    script.onload = () => {
        script.remove()
    }
}

// this is the script we need to get in early
// script has to be loaded this way to more easily get past updates to 
// browser security, previously devs might have put the contents of preload in to 
// a string then loaded and executed it by manual script injection.
loadScript("scripts/preload.js")

// notify dev script has successfully loaded
console.log("loaded my scripts")

