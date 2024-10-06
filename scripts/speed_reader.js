console.log('reader on');



async function sendMessageToTabs(){
    chrome.runtime.sendMessage({data:"yo"})
    .then((response) => {
            console.info("Popup received info")
            // document.getElementById('outputs').innerHTML+= response;

    })
    .catch((error) => {
            console.warn("Popup could not send message to pop up error was %s", error)
        })

    const tabs = await chrome.tabs.query({})
    console.log(tabs)

    for (const tab of tabs) {
    // Note: sensitive tab properties such as tab.title or tab.url can only be accessed for
    // URLs in the host_permissions section of manifest.json

    console.log("sending message to %s",tab.title)

        chrome.tabs.sendMessage(tab.id, {data:"yo"})
        .then((response) => {
                console.info("Popup received response from tab with title '%s' and url %s", response.title, response.url)
                document.getElementById('outputs').innerHTML+= response;

        })
        .catch((error) => {
                console.warn("Popup could not send message to tab %s: error was %s", tab.title, error)
            })
    }





}


function test(){
    console.log('testing features');
    sendMessageToTabs()
}

// add listeners to extension tab
document.getElementById('test').addEventListener('pointerdown',()=>{
    test();
})

//listen for messages from chrome extension pop up 
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    sendResponse('pinged pop up window')
    console.log('message received')
    console.log(request.data)
    
    } );

