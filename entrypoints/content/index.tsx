import { ContentScriptContext } from 'wxt/utils/content-script-context';
import { CreateContentElement } from '@/entrypoints/content/CreateContentElement.tsx';
import { Button } from '@/components/ui/button.tsx';

export default defineContentScript({
  matches: ['*://*.google.com/*'],
  cssInjectionMode: 'ui',
  main(ctx) {
    chrome.runtime.onMessage.addListener(async (message) => {
      if (message.action === 'summarize-text') {
        console.log('Content script received message:', message);
        const ui = await CreateUI(ctx);
        ui.mount();
      }
    });
  },
});

const CreateUI = async (ctx: ContentScriptContext) => {
  let removeUi: (() => void) | null = null;

  const ui = await createShadowRootUi(ctx, {
    name: 'smart-read-ui',
    position: 'overlay',
    anchor: 'body',
    onMount: (root) => {
      const onRemove = () => {
        if (removeUi) removeUi();
      };

      return CreateContentElement(root, () => (
        <Button onClick={() => onRemove()}>Hello</Button>
      ));
    },
    onRemove(root) {
      root?.unmount();
    },
  });

  removeUi = () => ui.remove();

  return ui;
};
