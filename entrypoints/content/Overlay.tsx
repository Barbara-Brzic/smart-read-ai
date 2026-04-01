import { useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import '@/entrypoints/popup/style.css';
import { Spinner } from '@/components/ui/spinner';
import { useSummarize } from '@/entrypoints/hooks/useSummarize.tsx';

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
      <header className="flex justify-end">
        <button
          onClick={onRemove}
          className="text-destructive cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Close overlay"
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      <main className="flex flex-col gap-2 justify-center items-center min-h-[100px]">
        {loading && (
          <div className="flex items-center gap-2">
            <span>Summarizing...</span>
            <Spinner />
          </div>
        )}
        {!loading && geminiResponse && (
          <p className="text-sm leading-relaxed">{geminiResponse}</p>
        )}
      </main>
    </div>
  );
}
