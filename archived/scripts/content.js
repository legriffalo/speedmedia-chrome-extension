// window.alert('content.js loaded');


chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

    var header1 = document.getElementsByTagName('h1')[0].textContent;

    sendResponse(header1)
    console.log('message received')
    // window.alert(request.data)
    
    } );