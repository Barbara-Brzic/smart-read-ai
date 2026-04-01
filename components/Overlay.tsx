import { X } from 'lucide-react';
import '@/entrypoints/popup/style.css';
export default function Overlay({
  selectedText,
  onRemove,
}: Readonly<{
  selectedText: string;
  onRemove: () => void;
}>) {
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
      <div>{selectedText && <p>{selectedText}</p>}</div>
    </div>
  );
}
