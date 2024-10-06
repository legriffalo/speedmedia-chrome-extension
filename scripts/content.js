// window.alert('content.js loaded');


chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {


    console.log(request.data)

    let cont = document.getElementsByTagName('p')[0].textContent;

    sendResponse(`<br> ${cont}`)

    console.log('message received')
    console.log(cont);
    console.log(sender);
    
    } );