import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ApiKeyContextType {
    apiKey: string | null;
    saveApiKey: (key: string) => void;
    clearApiKey: () => void;
    isKeySet: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [isKeySet, setIsKeySet] = useState(false);

    useEffect(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) {
            setApiKey(storedKey);
            setIsKeySet(true);
        }
    }, []);

    const saveApiKey = (key: string) => {
        localStorage.setItem('gemini_api_key', key);
        setApiKey(key);
        setIsKeySet(true);
    };

    const clearApiKey = () => {
        localStorage.removeItem('gemini_api_key');
        setApiKey(null);
        setIsKeySet(false);
    };

    return (
        <ApiKeyContext.Provider value={{ apiKey, saveApiKey, clearApiKey, isKeySet }}>
            {children}
        </ApiKeyContext.Provider>
    );
};

export const useApiKey = (): ApiKeyContextType => {
    const context = useContext(ApiKeyContext);
    if (context === undefined) {
        throw new Error('useApiKey must be used within an ApiKeyProvider');
    }
    return context;
};
