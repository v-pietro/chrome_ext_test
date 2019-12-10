document.addEventListener('click', onClick => {
  if (onClick.target.id === 'save') {
    chrome.runtime.sendMessage({ action: 'save' }, function(response) {});
  } 
});
