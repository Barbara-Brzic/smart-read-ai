import { X } from 'lucide-react';

export const OverlayHeader = ({
  onCloseClick,
}: {
  onCloseClick: () => void;
}) => {
  return (
    <header className="flex justify-end">
      <button
        onClick={onCloseClick}
        className="text-destructive cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Close overlay"
      >
        <X className="h-5 w-5" />
      </button>
    </header>
  );
};
