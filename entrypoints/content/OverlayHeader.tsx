import { GripVertical, X } from 'lucide-react';

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
      <button
        onMouseDown={onMouseDown}
        className="flex items-center gap-1 cursor-grab active:cursor-grabbing select-none"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium">
          Drag to move
        </span>
      </button>
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
