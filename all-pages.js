var s = document.createElement('script')
s.src = chrome.runtime.getURL('scripts/preload.js')
document.head.appendChild(s)
console.log("preload is in ")

var o = document.createElement('script')
o.src = chrome.runtime.getURL('scripts/sounds.js')
document.body.appendChild(o)
console.log("loaded the sound script")
