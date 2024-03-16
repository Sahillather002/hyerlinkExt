chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs && tabs.length > 0) {
    const currentTabUrl = tabs[0].url;
    chrome.storage.local.get([currentTabUrl], (result) => {
      const links = result[currentTabUrl] || [];
      document.getElementById(
        "count"
      ).textContent = `Hyperlinks: ${links.length}`;
    });
  } else {
    console.error("No active tabs found.");
  }
});

document.getElementById("show-details").addEventListener("click", () => {
  chrome.tabs.create({ url: "details.html" });
});
