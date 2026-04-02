import { useDraggable } from '@/entrypoints/hooks/useDraggable';
import { ReactElement } from 'react';

interface OverlayWrapperProps {
  render: (handleMouseDown: (e: React.MouseEvent) => void) => ReactElement;
}

export const OverlayWrapper = ({ render }: OverlayWrapperProps) => {
  const { position, isDragging, handleMouseDown } = useDraggable();

  return (
    <div
      className="p-4 bg-secondary text-secondary-foreground rounded-lg shadow-lg z-10001 space-y-2 max-h-100 min-h-50 h-auto w-130"
      style={{
        position: 'relative',
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'default',
        userSelect: isDragging ? 'none' : 'auto',
      }}
    >
      {render(handleMouseDown)}
    </div>
  );
};
