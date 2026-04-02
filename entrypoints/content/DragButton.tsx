import { GripVertical } from 'lucide-react';

type DragButtonProps = {
  onMouseDown?: (e: React.MouseEvent) => void;
};

export const DragButton = ({ onMouseDown }: DragButtonProps) => {
  return (
    <button
      onMouseDown={onMouseDown}
      className="flex items-center gap-1 cursor-grab active:cursor-grabbing select-none"
    >
      <GripVertical className="h-4 w-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground font-medium">
        Drag to move
      </span>
    </button>
  );
};
