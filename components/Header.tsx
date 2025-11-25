import React from 'react';
import { Activity, List } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-teal-700 hover:text-teal-800 transition">
          <div className="bg-teal-600 text-white p-1.5 rounded-lg">
            <Activity size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">MediVoice AI</h1>
        </Link>

        <nav className="flex gap-4">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition ${
              location.pathname === '/' 
                ? 'bg-teal-50 text-teal-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            録音 / Record
          </Link>
          <Link 
            to="/history" 
            className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${
              location.pathname === '/history' 
                ? 'bg-teal-50 text-teal-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <List size={16} />
            履歴 / History
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;