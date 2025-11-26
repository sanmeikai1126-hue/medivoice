import React, { useState, useEffect } from 'react';
import { Key, Save, X, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { useApiKey } from '../contexts/ApiKeyContext';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    forceOpen?: boolean; // If true, cannot be closed without a key
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, forceOpen = false }) => {
    const { apiKey, saveApiKey } = useApiKey();
    const [inputValue, setInputValue] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && apiKey) {
            setInputValue(apiKey);
        }
    }, [isOpen, apiKey]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!inputValue.trim()) {
            setError('APIキーを入力してください');
            return;
        }
        if (!inputValue.startsWith('AIza')) {
            setError('有効なGemini APIキーではないようです (AIza...で始まります)');
            // We don't block it, just warn, but let's block for safety in this demo
            // return; 
        }

        saveApiKey(inputValue.trim());
        setError('');
        onClose();
    };

    const handleClose = () => {
        if (forceOpen && !apiKey) {
            setError('APIキーの設定が必要です');
            return;
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Key size={24} />
                            APIキー設定
                        </h2>
                        <p className="text-teal-100 text-sm mt-1">
                            Google Gemini APIを利用するためにキーが必要です
                        </p>
                    </div>
                    {!forceOpen && (
                        <button onClick={handleClose} className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition">
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Gemini API Key
                        </label>
                        <div className="relative">
                            <input
                                type={showKey ? "text" : "password"}
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setError('');
                                }}
                                placeholder="AIzaSy..."
                                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-mono text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowKey(!showKey)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                        <div className="flex items-start gap-2">
                            <ExternalLink size={16} className="mt-0.5 shrink-0" />
                            <div>
                                <p className="font-bold mb-1">APIキーをお持ちでない場合</p>
                                <p>
                                    Google AI Studioから無料で取得できます。<br />
                                    <a
                                        href="https://aistudio.google.com/app/apikey"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline font-bold hover:text-blue-600"
                                    >
                                        キーを取得する &rarr;
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-gray-500">
                        ※ キーはブラウザ内にのみ保存され、外部サーバーには送信されません。
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full py-3 bg-teal-600 text-white rounded-lg font-bold shadow-lg hover:bg-teal-700 transition flex items-center justify-center gap-2"
                    >
                        <Save size={18} />
                        保存して開始
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;
