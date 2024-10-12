
// console.log("grabbing script to inject")
var s = document.createElement('script')
s.src = chrome.runtime.getURL('scripts/frames-preload.js')
document.body.appendChild(s)
console.log("preload is in ")