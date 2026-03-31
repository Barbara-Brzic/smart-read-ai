import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: ({ manifestVersion }) => {
    return {
      manifest_version: manifestVersion,
      name: 'Smart Read AI',
      description: 'Smart Read AI - Web Extension for reading articles',
      version: '1.0.0',
      permissions: ['storage'],
    };
  },
});
