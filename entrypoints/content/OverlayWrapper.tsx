export const OverlayWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 bg-secondary text-secondary-foreground rounded-lg shadow-lg z-10001 space-y-2 max-h-100 min-h-50 h-auto w-130">
      {children}
    </div>
  );
};
