import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IFormData, useFormData } from '@/entrypoints/hooks/useFormData';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

const createSummarizePrompt = (text: string): string => {
  return `Your purpose is to summarize given text in order to provide faster reading experience. This is the text: ${text}`;
};

const createRequestPayload = (text: string) => ({
  contents: [
    {
      parts: [
        {
          text: createSummarizePrompt(text),
        },
      ],
    },
  ],
});

const extractGeminiResponse = (data: GeminiResponse): string => {
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  return text || 'No response received from Gemini API.';
};

const summarizeText = async (
  text: string,
  credentials: IFormData
): Promise<string> => {
  if (!credentials.endpoint || !credentials.apiKey) {
    throw new Error('API credentials not set.');
  }

  const url = `${credentials.endpoint}?key=${credentials.apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createRequestPayload(text)),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: GeminiResponse = await response.json();
  return extractGeminiResponse(data);
};

export const useSummarize = (selectedText: string) => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, formData } = useFormData();
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !selectedText || hasCalledRef.current) {
      return;
    }

    hasCalledRef.current = true;

    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const summary = await summarizeText(selectedText, formData);
        setResponse(summary);
      } catch (error) {
        console.error('Failed to summarize text:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        setResponse(errorMessage);
        toast.error(
          'Failed to summarize text. Please check your API credentials.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [selectedText, formData, isLoaded]);

  return { geminiResponse: response, loading: isLoading };
};
