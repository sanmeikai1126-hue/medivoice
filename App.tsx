import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RecordPage from './pages/RecordPage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50">
          <Routes>
            <Route path="/" element={<RecordPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;