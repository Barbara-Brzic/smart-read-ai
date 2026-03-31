export default defineContentScript({
  matches: ['*://*.google.com/*'],
  cssInjectionMode: 'ui',
  main() {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'summarize-text') {
        console.log('Content script received message:', message);
      }
    });
  },
});
