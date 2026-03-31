export default defineBackground({
  main() {
    chrome.runtime.onInstalled.addListener(() => {
      chrome.contextMenus.create({
        title: 'Smart Read',
        id: 'smart-read-ai',
        contexts: ['all'],
      });
    });

    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === 'smart-read-ai') {
        chrome.tabs.sendMessage(tab?.id!, { action: 'summarize-text' });
      }
    });
  },
});
