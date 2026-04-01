import { ContentScriptContext } from 'wxt/utils/content-script-context';
import { CreateContentElement } from '@/entrypoints/content/CreateContentElement.tsx';
import Overlay from '@/entrypoints/content/Overlay.tsx';

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',
  main(ctx) {
    let lastClickPosition = { x: 0, y: 0 };
    let selectedText = '';

    document.addEventListener('contextmenu', (e) => {
      lastClickPosition = { x: e.clientX, y: e.clientY };

      const selection = globalThis.getSelection();
      selectedText = selection?.toString().trim() || '';
    });

    chrome.runtime.onMessage.addListener(async (message) => {
      if (message.action === 'summarize-text') {
        const ui = await CreateUI(ctx, lastClickPosition, selectedText);
        ui.mount();
      }
    });
  },
});

const CreateUI = async (
  ctx: ContentScriptContext,
  position: { x: number; y: number },
  selectedText: string
) => {
  let removeUi: (() => void) | null = null;

  const ui = await createShadowRootUi(ctx, {
    name: 'smart-read-ui',
    position: 'overlay',
    anchor: 'body',
    onMount: (root) => {
      const onRemove = () => {
        if (removeUi) removeUi();
      };

      return CreateContentElement(
        root,
        position,
        () => <Overlay selectedText={selectedText} onRemove={onRemove} />,
        onRemove
      );
    },
    onRemove(root) {
      root?.unmount();
    },
  });

  removeUi = () => ui.remove();

  return ui;
};
