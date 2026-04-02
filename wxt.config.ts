import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: ({ manifestVersion }) => {
    return {
      manifest_version: manifestVersion,
      name: 'Smart Read AI',
      description: 'AI-powered text summarization. Select any text and get instant summaries using Google Gemini AI.',
      version: '1.0.0',
      permissions: [
        'storage',
        'tabs',
        'activeTab',
        'scripting',
        'contextMenus',
        'declarativeNetRequest',
      ],
    };
  },
});
