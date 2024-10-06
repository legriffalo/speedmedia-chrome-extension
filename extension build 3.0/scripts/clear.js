// Whenever the extension is closed this script is called to 
// ensure that all processes started by the extension have stopped
// remove the popup element
document.getElementById("popout11925").remove();
// deactivate the hotkeys
document.removeEventListener('keydown', doc_keyUp);
// remove double tap listeners
document.removeEventListener('pointerup', detectDoubleTap(500));
