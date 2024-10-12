// function to send updated state info to extension to be stored
function updateExtensionState(updates, message){// function to send updated state info to extension to be stored
    // update the state with requested new values
    let keys = Object.keys(updates)
  
    for(let i = 0;i<keys.length;i++){
      extensionState[keys[i]] = updates[keys[i]];
    }
    localStorage.setItem("extensionState",JSON.stringify(extensionState))
    sendMessageExtension("sent-state-data",extensionState)
    console.log(extensionState, message)
  }

  // function to request state from extension
  async function getExtensionState(){
    var resp = await sendMessageExtension("request-state-data","request")
    return resp
  }
  
  // sent-state-data -- send data from popup to extension and store
  //request-state-data -- send data from extension to popup from storage
  async function sendMessageExtension(message,data){
    resp = 'none'
    await chrome.runtime.sendMessage({"message":message,
                                      "data":data
                                    })
    .then((response) => {
            console.info("state information sent to extension and got %s in response", response)
            resp = response
  
    })
    .catch((error) => {
            console.warn("Popup could not send message to extension error was %s", error)
        })
      
        return resp
    }
  