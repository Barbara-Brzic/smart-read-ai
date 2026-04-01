import { IFormData } from '@/entrypoints/hooks/useFormData.ts';
import React from 'react';
import toast from 'react-hot-toast';

export const useGemini = () => {
  const [geminiResponse, setGeminiResponse] = React.useState<string | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);

  const summarizeText = useCallback(
    async (text: string, formData: IFormData) => {
      if (!formData.endpoint || !formData.apiKey) {
        setGeminiResponse('API credentials not set.');
        return;
      }

      setLoading(true);
      try {
        const url = `${formData.endpoint}?key=${formData.apiKey}`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createSummarizePayload(text)),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setGeminiResponse(extractGeminiResponse(data));
      } catch (error) {
        console.error('Error:', error);
        setGeminiResponse(null);
        toast.error(
          'Failed to summarize text. Please check your API credentials.'
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createSummarizePrompt = (text: string) => {
    return `Your purpose is to summarize given text in order to provide faster reading experience.
       This is the text: ${text}
    `;
  };

  const createSummarizePayload = (text: string) => {
    return {
      contents: [
        {
          parts: [
            {
              text: createSummarizePrompt(text),
            },
          ],
        },
      ],
    };
  };

  const extractGeminiResponse = (data: any) => {
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'No response received from Gemini API.'
    );
  };

  return { geminiResponse, loading, summarizeText };
};
