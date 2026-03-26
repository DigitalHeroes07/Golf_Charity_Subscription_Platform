import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  type: 'score' | 'charity' | 'purchase' | 'profile';
  title: string;
  date: string;
  amount?: string;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('user_activity_history');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const addHistoryEvent = (item: Omit<HistoryItem, 'id' | 'date'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      date: new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date()),
    };
    
    setHistory((prev) => {
      const updated = [newItem, ...prev];
      localStorage.setItem('user_activity_history', JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem('user_activity_history');
    setHistory([]);
  };

  return { history, addHistoryEvent, clearHistory };
}
