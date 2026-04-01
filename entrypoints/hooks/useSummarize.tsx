import { useEffect, useRef, useState } from 'react';
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
  return `The user has selected the following text from a webpage. 
  Provide a clear, concise summary highlighting the main points and key information. 
  Include relevant context when helpful. Respond in the same language as the original text.
  Text: ${text}`;
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
  const [error, setError] = useState<string | null>(null);
  const { formData, isFormDataLoaded } = useFormData();
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (!isFormDataLoaded || !selectedText || hasCalledRef.current) {
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
        setError('Failed to summarize text. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [selectedText, formData, isFormDataLoaded]);

  return { geminiResponse: response, loading: isLoading, error };
};
