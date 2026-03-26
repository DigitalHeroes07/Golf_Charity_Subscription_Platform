'use client';

import React, { useRef, useState } from 'react';
import styles from '@/components/winnings/Winnings.module.css';
import { Gift, CalendarDays, CheckCircle2, Upload, Clock, AlertCircle } from 'lucide-react';

export default function WinningsPage() {
  const [uploadLoadingId, setUploadLoadingId] = useState<string | null>(null);

  // Local component state
  const participationStatus = {
    isQualified: true,
    upcomingDrawDate: 'May 1, 2026',
    estimatedPool: '₹12,45,000'
  };

  const [winnings, setWinnings] = useState([
    {
      id: 'w1',
      drawMonth: 'April 2026',
      matchType: 4,
      amount: 15000.00,
      status: 'pending', // pending, verified, paid
      proofUploaded: false
    },
    {
      id: 'w2',
      drawMonth: 'February 2026',
      matchType: 3,
      amount: 2500.00,
      status: 'paid',
      proofUploaded: true
    }
  ]);

  const handleFileUpload = (winId: string) => {
    // Simulation wrapper for S3 image upload bucket logic
    setUploadLoadingId(winId);
    setTimeout(() => {
      setWinnings(winnings.map(w => 
        w.id === winId ? { ...w, proofUploaded: true, status: 'pending_review' } : w
      ));
      setUploadLoadingId(null);
      alert('Verification screenshot uploaded successfully! The Admin team will review it shortly.');
    }, 1500);
  };

  return (
    <div className={styles.pageContent}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Winnings & Draws</h1>
        <p className={styles.pageSubtitle}>Track your participation and claim your prizes.</p>
      </header>

      <div className={styles.grid}>
        
        {/* Draw Participation Status */}
        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Upcoming Draw</h3>
            <CalendarDays size={20} className={styles.iconAccent} />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.drawStatusBox}>
              <div className={styles.statusLabel}>Next Scheduled Draw</div>
              <div className={styles.drawDate}>{participationStatus.upcomingDrawDate}</div>
              
              {participationStatus.isQualified ? (
                <div className={styles.statusBadgeSuccess}>
                  <CheckCircle2 size={18} /> You are Qualified
                </div>
              ) : (
                <div className={styles.statusBadgeWaiting}>
                  <AlertCircle size={18} /> Needs 5 Scores to Qualify
                </div>
              )}
            </div>
            
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
              The current estimated prize pool is <strong>{participationStatus.estimatedPool}</strong>.
              If no one matches all 5 numbers, the 40% jackpot share will roll over into next month!
            </p>
          </div>
        </div>

        {/* Winnings History */}
        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Your Prizes</h3>
            <Gift size={20} className={styles.iconAccent} style={{color: 'var(--accent)'}} />
          </div>
          <div className={styles.cardBody}>
            {winnings.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No winnings yet.</p>
                <p style={{fontSize: '0.9rem', color: '#64748b', marginTop: 8}}>Keep submitting your scores and playing!</p>
              </div>
            ) : (
              <div className={styles.winningsList}>
                {winnings.map(win => (
                  <div key={win.id} className={styles.winningItem}>
                    
                    <div className={styles.winningLeft}>
                      <div className={styles.winningMatch}>{win.matchType}-Number Match</div>
                      <div className={styles.winningDraw}>{win.drawMonth} Draw</div>
                      {win.status === 'paid' && <span className={styles.badgeVerified}>Paid</span>}
                      {win.status === 'pending' && <span className={styles.badgePending}>Action Required</span>}
                      {win.status === 'pending_review' && <span className={styles.badgePending} style={{background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8'}}>In Review</span>}
                    </div>

                    <div className={styles.winningRight}>
                      <div className={styles.winningAmount}>₹{win.amount.toFixed(2)}</div>
                      
                      {/* KYC Attachment Portal */ }
                      {win.status === 'pending' && !win.proofUploaded && (
                        <div className={styles.verificationBox}>
                          <p style={{fontSize: '0.8rem', color: '#94a3b8', marginBottom: 8}}>
                            Upload a screenshot of your score platform showing your name and last 5 scores to claim.
                          </p>
                          <label className={styles.uploadBtn}>
                            <input 
                              type="file" 
                              accept="image/*" 
                              style={{ display: 'none' }} 
                              onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                  handleFileUpload(win.id);
                                }
                              }}
                            />
                            {uploadLoadingId === win.id ? (
                              <><Clock size={16} className="animate-spin" /> Uploading...</>
                            ) : (
                              <><Upload size={16} /> Upload Proof</>
                            )}
                          </label>
                        </div>
                      )}
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
