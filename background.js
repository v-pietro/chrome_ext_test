chrome.windows.onRemoved.addListener((windowId) => {
    console.log(windowId);
    fetch('localhost');
})