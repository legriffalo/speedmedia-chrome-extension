// Whenever the extension is closed this script is called to
// ensure that all processes started by the extension have stopped
// remove the popup element
document.getElementById("popout11925").remove();
// remove double tap listeners
document.removeEventListener("pointerup", detectDoubleTap(500));
//Message all iframes
window.postMessage(
  `{"message":"stopExtension","state":${JSON.stringify(extensionState)}}`,
  "*"
);
var iFrames = document.querySelectorAll("iframe");
iFrames.forEach((e) => {
  e.contentWindow.postMessage(
    `{"message":"stopExtension","state":${JSON.stringify(extensionState)}}`,
    "*"
  );
});
// deactivate all the extension hotkeys
document.removeEventListener("keydown", doc_keyUp, true);
// reset extensionState variable
var extensionState = {};
