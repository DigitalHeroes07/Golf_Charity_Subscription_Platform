'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/components/dashboard/Dashboard.module.css';
import { Trophy, Clock, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';
import { useHistory } from '@/hooks/useHistory';

export default function DashboardOverviewClient({ 
  displayName, 
  paymentStatus, 
  paymentPlan 
}: { 
  displayName: string, 
  paymentStatus?: string, 
  paymentPlan?: string 
}) {
  const { history, addHistoryEvent } = useHistory();
  const [alertMsg, setAlertMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  useEffect(() => {
    if (paymentStatus) {
      const planName = paymentPlan === 'monthly' ? 'Monthly Member' : 'Yearly Foundation';
      const price = paymentPlan === 'monthly' ? '₹1,499' : '₹14,990';
      
      if (paymentStatus === 'success') {
        alert('Payment done successfully');
        setAlertMsg({ type: 'success', text: 'Payment done successfully' });
        addHistoryEvent({
          type: 'purchase',
          title: `Joined ImpactGolf ${planName}`,
          amount: price,
        });
      } else if (paymentStatus === 'cancelled') {
        alert('Payment failed');
        setAlertMsg({ type: 'error', text: 'Payment failed' });
        addHistoryEvent({
          type: 'purchase',
          title: `Failed to join ${planName}`,
          amount: 'Failed',
        });
      }
      
      // Clean URL so it doesn't trigger again on reload
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [paymentStatus, paymentPlan]); // ESLint: we specifically want to run this once on mount

  // Extract real scores from global history
  const latestScores = history
    .filter(h => h.type === 'score')
    .slice(0, 5)
    .map(h => {
      // Parse "Logged 18-hole Score - 36 pts"
      const match = h.title.match(/(\d+)\s*pts/);
      return match ? parseInt(match[1], 10) : 0;
    });

  // Extract real charity or fallback
  const lastCharityAction = history.find(h => h.type === 'charity');
  const charityName = lastCharityAction ? lastCharityAction.title.replace('Selected ', '') : 'None Selected';
  const charityPercent = lastCharityAction && lastCharityAction.amount ? lastCharityAction.amount : '10%';

  // Check if subscribed successfully (exclude failed attempts)
  const isSubscribed = history.some(h => h.type === 'purchase' && h.amount !== 'Failed');

  return (
    <div className={styles.pageContent}>
      
      {/* Dynamic Payment Alerts */}
      {alertMsg && (
        <div style={{
          padding: '1rem',
          marginBottom: '1.5rem',
          borderRadius: '8px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: alertMsg.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: alertMsg.type === 'success' ? '#10b981' : '#ef4444',
          border: `1px solid ${alertMsg.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
        }}>
           {alertMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
           {alertMsg.text}
        </div>
      )}

      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard Overview</h1>
          <p className={styles.pageSubtitle}>Hello, {displayName}. Here is your current standing.</p>
        </div>
        
        {/* Subscription Badge */}
        {isSubscribed ? (
          <div className={styles.statusBadgeSuccess}>
            <CheckCircle2 size={16} /> Active Premium Member
          </div>
        ) : (
          <div className={styles.statusBadgeError}>
            <AlertCircle size={16} /> Subscription Inactive
          </div>
        )}
      </header>

      <div className={styles.dashboardGrid}>
        
        {/* Current State Card */}
        <div className={`glass-panel ${styles.card} ${styles.colSpan2}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Subscription & Charity</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.flexSplit}>
              <div>
                <div className={styles.label}>Next Renewal Date</div>
                <div className={styles.valueLarge}>{isSubscribed ? 'May 20, 2026' : 'N/A'}</div>
              </div>
              <div className={styles.divider}></div>
              <div>
                <div className={styles.label}>Selected Charity</div>
                <div className={styles.valueLargeCharity}>{charityName}</div>
                <div className={styles.statLabel}>Contributing {charityPercent} of subscription</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scores Overview Card */}
        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Recent Scores</h3>
            <span className={styles.badgeHighlight}>{latestScores.length}/5 Logged</span>
          </div>
          <div className={styles.cardBody}>
            {latestScores.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: '#94a3b8' }}>
                <Edit3 size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p>No scores logged yet.</p>
              </div>
            ) : (
              <div className={styles.scoreRowGroup}>
                {latestScores.map((score, index) => (
                  <div key={index} className={styles.scoreItem}>
                    <div className={styles.scoreLabel}>Score {index + 1}</div>
                    <div className={styles.scoreVal}>{score}</div>
                  </div>
                ))}
              </div>
            )}
            
            {latestScores.length < 5 && (
              <p className={styles.warningText}>You need {5 - latestScores.length} more scores to qualify for the next draw.</p>
            )}
            
            <a href="/dashboard/scores" className={`btn-secondary ${styles.fullWidthBtn}`} style={{textAlign:'center', display:'block', boxSizing:'border-box'}}>
              Log New Score
            </a>
          </div>
        </div>

        {/* Upcoming Draw Card */}
        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Next Draw</h3>
            <Clock size={20} className={styles.iconAccent} />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.drawStatusCenter}>
              <div className={styles.drawCountdown}>14 Days</div>
              <div className={styles.label}>Until May Draw</div>
              
              <div className={styles.poolInfoContainer}>
                 <div className={styles.label}>Est. Prize Pool</div>
                 <div className={styles.valueGiant}>₹12,45,000</div>
              </div>

              {latestScores.length === 5 && isSubscribed ? (
                <div className={styles.statusBadgeSuccessCenter}>
                  <CheckCircle2 size={16} /> You are entered
                </div>
              ) : (
                <div className={styles.statusBadgeErrorCenter}>
                  <AlertCircle size={16} /> Not eligible yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Winnings Summary Card - Empty by default as requested */}
        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Lifetime Winnings</h3>
            <Trophy size={20} className={styles.iconGold} />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.winningsDisplay}>
              ₹0.00
            </div>
            
            <div className={styles.winningsList}>
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '1rem 0' }}>
                No winnings recorded yet. Try entering the next draw!
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
// Temporary mock for icon to prevent import crash since I didn't import Edit3 globally above
const Edit3 = ({ size, style }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);
