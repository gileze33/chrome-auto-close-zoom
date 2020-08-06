const ZOOM_JOIN_URL_REGEX = /(.*)zoom.us(\/join|\/j)\/(\d+)(.*)(\#success)/;
const AUTO_CLOSE_TIME = 5000; // 5 seconds

function isZoomJoinPage(url) {
  return ZOOM_JOIN_URL_REGEX.test(url);
}

chrome.tabs.onUpdated.addListener((activeInfo) => {  
  chrome.tabs.getSelected(null, function(tab) {
    if (!isZoomJoinPage(tab.url)) {
      return;
    }

    setTimeout(() => {
      // check the user hasn't changed the url since
      if (isZoomJoinPage(tab.url)) {
        try {
          chrome.tabs.remove(tab.id);
        }
        catch (err) {
          console.log(`failed to close tab ${tab.id} with error`, err);
        }
      }
    }, AUTO_CLOSE_TIME);
  });
});