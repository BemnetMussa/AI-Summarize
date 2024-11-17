// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarizePage') {
    const pageText = document.body.innerText;  // Extract all text from the page
    sendResponse({ text: pageText });
  }
});
