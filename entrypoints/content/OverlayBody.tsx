import { Spinner } from '@/components/ui/spinner.tsx';
import Markdown from 'react-markdown';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { CircleAlert } from 'lucide-react';

export const OverlayBody = ({
  loading,
  text,
  error,
}: {
  loading: boolean;
  text: string | null;
  error: string | null;
}) => {
  return (
    <main className="flex flex-col gap-2 justify-center items-center min-h-25">
      {error && (
        <p className="flex flex-col gap-3 justify-center items-center text-red-500">
          <CircleAlert />
          {error}
        </p>
      )}
      {loading && (
        <div className="flex items-center gap-2">
          <span>Summarizing...</span>
          <Spinner />
        </div>
      )}
      {!loading && text && (
        <ScrollArea className="w-full h-50 overflow-hidden">
          <div className="p-2">
            <Markdown>{text}</Markdown>
          </div>
        </ScrollArea>
      )}
    </main>
  );
};
