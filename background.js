chrome.windows.onRemoved.addListener((windowId) => {
    console.log(windowId);
    closeBrowser();
})

function closeBrowser() {
  return;
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