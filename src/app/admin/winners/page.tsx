'use client';

import React, { useState } from 'react';
import styles from '@/components/admin/Admin.module.css';
import { CheckSquare, ExternalLink, Check, X } from 'lucide-react';

export default function WinnerVerification() {
  const [submissions, setSubmissions] = useState([
    {
      id: 'w1',
      userId: 'user_8921',
      email: 'john.golfer@example.com',
      drawMonth: 'April 2026',
      matchType: 4,
      amount: 145833.00,
      status: 'pending_review',
      proofUrl: '#',
      submittedAt: '2 hours ago'
    },
    {
      id: 'w2',
      userId: 'user_4192',
      email: 'sarah.smith@example.com',
      drawMonth: 'April 2026',
      matchType: 3,
      amount: 7440.00,
      status: 'pending_review',
      proofUrl: '#',
      submittedAt: '5 hours ago'
    }
  ]);

  const handleApprove = (id: string, email: string) => {
    if (confirm(`Are you sure you want to approve ${email}'s submission and mark the prize as PAID?`)) {
      setSubmissions(submissions.filter(s => s.id !== id));
      alert('Submission approved and payout marked as complete.');
    }
  };

  const handleReject = (id: string, email: string) => {
    if (confirm(`Are you sure you want to reject ${email}'s submission? They will need to re-upload their proof.`)) {
      setSubmissions(submissions.filter(s => s.id !== id));
      alert('Submission rejected.');
    }
  };

  return (
    <div className={styles.pageContent}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Winner Verification</h1>
          <p className={styles.pageSubtitle}>Review screenshot proofs submitted by winners to unlock payouts.</p>
        </div>
      </header>

      <div className={styles.panel} style={{ marginTop: 0 }}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle} style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <CheckSquare className={styles.statIcon} size={20} />
            Pending Reviews
          </h3>
          <span style={{background: 'rgba(234, 179, 8, 0.1)', color: 'var(--accent)', padding: '4px 12px', borderRadius: 999, fontSize: '0.85rem', fontWeight: 600}}>
            {submissions.length} Awaiting
          </span>
        </div>

        {submissions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            No pending submissions to review.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User Email</th>
                  <th>Draw Details</th>
                  <th>Prize Amount</th>
                  <th>Submitted</th>
                  <th>Proof</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: 500, color: '#fff' }}>{sub.email}</td>
                    <td>
                      <div>{sub.drawMonth}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{sub.matchType} Matches</div>
                    </td>
                    <td style={{ color: 'var(--primary)', fontWeight: 600 }}>₹{sub.amount.toFixed(2)}</td>
                    <td>{sub.submittedAt}</td>
                    <td>
                      <a href={sub.proofUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#38bdf8', fontSize: '0.9rem', textDecoration: 'none' }}>
                        View Image <ExternalLink size={14} />
                      </a>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button 
                          title="Approve & Pay"
                          onClick={() => handleApprove(sub.id, sub.email)}
                          style={{
                            width: 32, height: 32, borderRadius: 8, border: 'none', background: 'rgba(16, 185, 129, 0.1)',
                            color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                          }}
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          title="Reject"
                          onClick={() => handleReject(sub.id, sub.email)}
                          style={{
                            width: 32, height: 32, borderRadius: 8, border: 'none', background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                          }}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
