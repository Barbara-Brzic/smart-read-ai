import { useEffect, useState } from 'react';

export interface IFormData {
  endpoint: string;
  apiKey: string;
}

interface StorageResult {
  formData?: IFormData;
}

const STORAGE_KEY = 'formData';

export const useFormData = () => {
  const [formData, setFormData] = useState<IFormData>({
    endpoint: '',
    apiKey: '',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(STORAGE_KEY, (result: StorageResult) => {
      if (result.formData) {
        setFormData(result.formData);
      }
      setIsLoaded(true);
    });
  }, []);

  const saveFormData = (data: IFormData) => {
    setFormData(data);
    chrome.storage.local.set({ [STORAGE_KEY]: data });
  };

  return { formData, saveFormData, isFormDataLoaded: isLoaded };
};
