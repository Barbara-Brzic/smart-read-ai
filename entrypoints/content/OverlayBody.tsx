import { Spinner } from '@/components/ui/spinner.tsx';
import Markdown from 'react-markdown';

export const OverlayBody = ({
  loading,
  text,
}: {
  loading: boolean;
  text: string | null;
}) => {
  return (
    <main className="flex flex-col gap-2 justify-center items-center min-h-25">
      {loading && (
        <div className="flex items-center gap-2">
          <span>Summarizing...</span>
          <Spinner />
        </div>
      )}
      {!loading && text && <Markdown>{text}</Markdown>}
    </main>
  );
};
