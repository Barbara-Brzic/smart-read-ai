import { X } from 'lucide-react';
import { DragButton } from '@/entrypoints/content/DragButton.tsx';

interface OverlayHeaderProps {
  onCloseClick: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
}

export const OverlayHeader = ({
  onCloseClick,
  onMouseDown,
}: OverlayHeaderProps) => {
  return (
    <header className="flex justify-between items-center">
      <DragButton onMouseDown={onMouseDown} />
      <button
        onClick={onCloseClick}
        onMouseDown={(e) => e.stopPropagation()}
        className="text-destructive cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Close overlay"
      >
        <X className="h-5 w-5" />
      </button>
    </header>
  );
};
