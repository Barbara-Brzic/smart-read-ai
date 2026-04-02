import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import '@/entrypoints/popup/style.css';
import { useSummarize } from '@/entrypoints/hooks/useSummarize.tsx';
import { OverlayHeader } from '@/entrypoints/content/OverlayHeader.tsx';
import { OverlayBody } from '@/entrypoints/content/OverlayBody.tsx';
import { OverlayWrapper } from '@/entrypoints/content/OverlayWrapper.tsx';

interface OverlayProps {
  selectedText: string;
  onRemove: () => void;
}

export default function Overlay({
  selectedText,
  onRemove,
}: Readonly<OverlayProps>) {
  const { geminiResponse, loading, error } = useSummarize(selectedText);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!selectedText) {
      toast.error('Please select some text to summarize.');
    } else if (error) {
      toast.error(error);
    }
  }, [selectedText, error]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove();
    }, 200);
  };

  if (!selectedText) return null;

  return (
    <OverlayWrapper
      isExiting={isExiting}
      render={(handleMouseDown) => (
        <>
          <OverlayHeader
            onCloseClick={handleClose}
            onMouseDown={handleMouseDown}
          />
          <OverlayBody loading={loading} text={geminiResponse} error={error} />
        </>
      )}
    />
  );
}
