import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import '@/entrypoints/popup/style.css';
import { Spinner } from '@/components/ui/spinner';
import { useGemini } from '@/entrypoints/hooks/useGemini.tsx';
import { useFormData } from '@/entrypoints/hooks/useFormData.ts';

export default function Overlay({
  selectedText,
  onRemove,
}: Readonly<{
  selectedText: string;
  onRemove: () => void;
}>) {
  const { loading, geminiResponse, summarizeText } = useGemini();
  const { isLoaded, formData } = useFormData();
  const hasCalledRef = useRef(false);

  useEffect(() => {
    // Only call once when formData is loaded and selectedText exists
    if (
      isLoaded &&
      selectedText.length > 0 &&
      formData &&
      !hasCalledRef.current
    ) {
      hasCalledRef.current = true;
      summarizeText(selectedText, formData);
    }
  }, [selectedText, formData, isLoaded, summarizeText]);

  return (
    <div
      className={
        'p-4 bg-secondary text-secondary-foreground rounded-lg shadow-lg z-10001 space-y-2'
      }
    >
      <div className={'flex justify-end'}>
        <X
          onClick={() => onRemove()}
          className={'text-destructive cursor-pointer'}
        />
      </div>
      <div className={'flex flex-col gap-2 justify-center items-center'}>
        {loading && (
          <p>
            Summarizing...
            <Spinner />
          </p>
        )}
        {geminiResponse && <p>{geminiResponse}</p>}
      </div>
    </div>
  );
}
