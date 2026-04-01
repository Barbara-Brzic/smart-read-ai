import { useEffect } from 'react';
import toast from 'react-hot-toast';
import '@/entrypoints/popup/style.css';
import { useSummarize } from '@/entrypoints/hooks/useSummarize.tsx';
import { OverlayHeader } from '@/entrypoints/content/OverlayHeader.tsx';
import { OverlayBody } from '@/entrypoints/content/OverlayBody.tsx';

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
      <OverlayHeader onCloseClick={onRemove} />
      <OverlayBody loading={loading} text={geminiResponse} />
    </div>
  );
}
