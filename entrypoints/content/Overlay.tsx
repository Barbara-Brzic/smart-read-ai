import { useEffect } from 'react';
import toast from 'react-hot-toast';
import '@/entrypoints/popup/style.css';
import { Spinner } from '@/components/ui/spinner';
import { useSummarize } from '@/entrypoints/hooks/useSummarize.tsx';
import Markdown from 'react-markdown';
import { Header } from '@/entrypoints/content/Header.tsx';

interface OverlayProps {
  selectedText: string;
  onRemove: () => void;
}

export default function Overlay({
  selectedText,
  onRemove,
}: Readonly<OverlayProps>) {
  const { geminiResponse, loading } = useSummarize(selectedText);

  useEffect(() => {
    if (!selectedText) {
      toast.error('Please select some text to summarize.');
    }
  }, [selectedText]);

  return (
    <div className="p-4 bg-secondary text-secondary-foreground rounded-lg shadow-lg z-10001 space-y-2">
      <Header onCloseClick={onRemove} />

      <main className="flex flex-col gap-2 justify-center items-center min-h-25">
        {loading && (
          <div className="flex items-center gap-2">
            <span>Summarizing...</span>
            <Spinner />
          </div>
        )}
        {!loading && geminiResponse && <Markdown>{geminiResponse}</Markdown>}
      </main>
    </div>
  );
}
