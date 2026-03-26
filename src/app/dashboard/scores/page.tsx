'use client';

import React, { useState } from 'react';
import styles from '@/components/scores/Scores.module.css';
import { Calendar, PlusCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ScoresPage() {
  const [scoreVal, setScoreVal] = useState('');
  const [scoreDate, setScoreDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize empty state to verify History injection works from zero
  const [recentScores, setRecentScores] = useState<{id: string, score: number, date: string}[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const parsedScore = parseInt(scoreVal);
    
    // Stableford Validation
    if (isNaN(parsedScore) || parsedScore < 1 || parsedScore > 45) {
      setError('Score must be a valid Stableford point value between 1 and 45.');
      return;
    }

    if (!scoreDate) {
      setError('Please select the date played.');
      return;
    }

    setLoading(true);

    // TODO: Connect this to the main user profile database on next sprint
    // Processing logic: keep only the last 5 active scores for Stableford rolling limit
    setTimeout(() => {
      const newScoreObj = {
        id: Date.now().toString(),
        score: parsedScore,
        date: scoreDate
      };
      
      const newScoresArray = [newScoreObj, ...recentScores].slice(0, 5);
      
      // Sort natively by date descending (most recent first)
      newScoresArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setRecentScores(newScoresArray);
      
      // Dispatch explicit user history event natively mimicking DB transaction
      const existingHistoryStr = localStorage.getItem('user_activity_history');
      const existingHistory = existingHistoryStr ? JSON.parse(existingHistoryStr) : [];
      const newHistoryItem = {
        id: Date.now().toString(),
        type: 'score',
        title: `Logged 18-hole Score - ${parsedScore} pts`,
        date: new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date()),
      };
      localStorage.setItem('user_activity_history', JSON.stringify([newHistoryItem, ...existingHistory]));

      setSuccess(`Successfully logged ${parsedScore} points for ${scoreDate}`);
      setScoreVal('');
      setScoreDate('');
      setLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    }, 800);
  };

  return (
    <div className={styles.pageContent}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Score Management</h1>
          <p className={styles.pageSubtitle}>Log your latest Stableford scores to qualify for draws.</p>
        </div>
      </header>

      <div className={styles.grid}>
        
        {/* Entry Form */}
        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Log a Score</h3>
          </div>
          <div className={styles.cardBody}>
            {error && <div className={styles.errorBox}><AlertCircle size={16}/> {error}</div>}
            {success && <div className={styles.successBox}><CheckCircle2 size={16}/> {success}</div>}
            
            <form onSubmit={handleSubmit} className={styles.scoreForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Stableford Points (1 - 45)</label>
                <input 
                  type="number" 
                  className={styles.input} 
                  min="1" max="45"
                  value={scoreVal}
                  onChange={(e) => setScoreVal(e.target.value)}
                  placeholder="e.g. 36"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Date Played</label>
                <div className={styles.dateInputWrapper}>
                  <Calendar size={18} className={styles.inputIcon} />
                  <input 
                    type="date" 
                    className={styles.inputWithIcon}
                    value={scoreDate}
                    max={new Date().toISOString().split('T')[0]} // Cannot be future
                    onChange={(e) => setScoreDate(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className={`btn-primary ${styles.submitBtn}`}
                disabled={loading}
              >
                {loading ? 'Saving...' : <><PlusCircle size={18} /> Add Score</>}
              </button>
            </form>

            <div className={styles.infoBox}>
               <strong>How it works:</strong> We only keep your 5 most recent scores. When you log a 6th score, the oldest is automatically removed from your rolling average.
            </div>
          </div>
        </div>

        {/* Rolling 5 History */}
        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardHeader}>
             <h3 className={styles.cardTitle}>Your Rolling 5</h3>
             <span className={styles.badgeHighlight}>{recentScores.length}/5 Logged</span>
          </div>
          <div className={styles.cardBody}>
            {recentScores.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No scores logged yet.</p>
                <p className={styles.emptySmall}>Log 5 scores to enter the next draw.</p>
              </div>
            ) : (
              <div className={styles.scoreList}>
                {recentScores.map((ms, idx) => (
                  <div key={ms.id} className={styles.historyItem}>
                    <div className={styles.historyLeft}>
                      <div className={styles.historyNumber}>#{idx + 1}</div>
                      <div className={styles.historyDate}>{new Date(ms.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                    <div className={styles.historyRight}>
                      <span className={styles.historyVal}>{ms.score}</span>
                      <span className={styles.historyLabel}>pts</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
