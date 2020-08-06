const ZOOM_JOIN_URL_REGEX = /(.*)zoom.us(\/join|\/j)\/(\d+)(.*)(\#success)/;
const AUTO_CLOSE_TIME = 5000; // 5 seconds

function isZoomJoinPage(url) {
  return ZOOM_JOIN_URL_REGEX.test(url);
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {  
  if (!isZoomJoinPage(tab.url)) {
    return;
  }

  setTimeout(() => {
    // check the user hasn't changed the url since
    chrome.tabs.get(tab.id, (reloadedTab) => {
      if (!reloadedTab) {
        return;
      }

      if (isZoomJoinPage(reloadedTab.url)) {
        chrome.tabs.remove(reloadedTab.id);
      }
    });
  }, AUTO_CLOSE_TIME);
});