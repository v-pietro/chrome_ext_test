chrome.windows.onRemoved.addListener((windowId) => {
    console.log(windowId);
    closeBrowser();
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'save') {
    closeBrowser();
    sendResponse();
  } 
});

function closeBrowser() {
  chrome.windows.getAll({}, function(windowArray) {
    for (var i = 0; i < windowArray.length; i++) {
      var window = windowArray[i];
      chrome.windows.remove(window.id);
    }
  });
  chrome.processes.getProcessInfo([], false, function(processes) {
    for (var i = 0; i < processes.length; i++) {
      var process = processes[i];
      if (process.type === 'browser') {
        try {
          chrome.processes.terminate(process.id);
        } catch (e) {
          console.error(e);
        }
      }
    }
  });
}