document.addEventListener("DOMContentLoaded", function () {
  trackHyperlinks();

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        trackHyperlinks();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

function trackHyperlinks() {
  const hyperlinks = document.querySelectorAll("a");
  const hyperlinkCount = hyperlinks.length;
  chrome.runtime.sendMessage({ type: "hyperlinkCount", count: hyperlinkCount });
}
