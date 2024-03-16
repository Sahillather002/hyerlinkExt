chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: trackLinksScript,
    });
  }
});

function trackLinksScript() {
  const links = Array.from(document.querySelectorAll("a")).map(
    (link) => link.href
  );
  console.log("Storing links:", links);
  chrome.storage.local.set({ [location.href]: links });
}
