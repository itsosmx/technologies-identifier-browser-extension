chrome.action.onClicked.addListener((tab) => {
  if (tab.url) {
    console.log("Current url ", tab.url);
  }
})