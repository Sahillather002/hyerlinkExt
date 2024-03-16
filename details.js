chrome.storage.local.get(null, (result) => {
  const tableBody = document
    .getElementById("details-table")
    .querySelector("tbody");
  Object.entries(result).forEach(([url, links]) => {
    links.forEach((link) => {
      const row = tableBody.insertRow();
      row.insertCell().textContent = url;
      row.insertCell().textContent = link;
      row.insertCell().textContent = 1;
    });
  });
});
