console.log(chrome.tabs);

// chrome.tabs.create({url: 'controls.html'}) 

function test(){
// chrome.tabs.create({url: 'controls.html'}) 
// window.open('controls2.html', '_blank', 'toolbar=no, location=yes, status=yes, menubar=no, scrollbars=no');
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {data: "hello"}, response=>{



                        // Print response on popup.html
                        
                        var msg = document.createElement("h3");
                        
                        msg.innerHTML = 'H1:'+ response;
                        
                        document.getElementById("container").appendChild(msg);
                        
        }




        );
        
        });

}


document.getElementById('tester').addEventListener('pointerdown',()=>{
        test();
})