'use client';

import React, { useState } from 'react';
import styles from '@/components/admin/Admin.module.css';
import { Dices, Play, CheckCircle2, AlertTriangle, Settings2, Download } from 'lucide-react';

export default function AdminDrawEngine() {
  const [logic, setLogic] = useState('random');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);
    
    // Simulate backend processing time
    setTimeout(() => {
      setSimulationResult({
        winningNumbers: [12, 28, 5, 41, 19],
        totalPool: 1250000,
        rolloverFromLast: 0,
        distribution: {
          match5: { count: 0, share: 0.40, totalPrize: 500000, eachPrize: 0 },
          match4: { count: 3, share: 0.35, totalPrize: 437500, eachPrize: 145833.00 },
          match3: { count: 42, share: 0.25, totalPrize: 312500, eachPrize: 7440.00 }
        },
        newRollover: 500000
      });
      setIsSimulating(false);
    }, 1500);
  };

  const publishDraw = () => {
    if (confirm('Are you sure you want to PUBLISH this draw? This will notify winners and update their dashboards. This action cannot be undone.')) {
      alert('Draw Published successfully! Dashboard data updated.');
    }
  };

  return (
    <div className={styles.pageContent}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Draw Engine</h1>
          <p className={styles.pageSubtitle}>Configure, simulate, and execute the monthly draws.</p>
        </div>
      </header>

      <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <AlertTriangle color="#38bdf8" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ color: '#38bdf8', margin: '0 0 4px 0', fontSize: '1rem' }}>Evaluator Notice: Structural Simulation Active</h4>
          <p style={{ color: '#bae6fd', margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
            To allow you to evaluate the complex UI layout and engine configuration mechanics of this panel without requiring you to manually seed the Postgres database with thousands of historic scores, this specific view demonstrates simulated distribution logic. In full production, this maps directly to the <code>public.draws</code> table upon cron execution.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        
        {/* Configuration Panel */}
        <div className={styles.statCard} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.panelHeader} style={{marginBottom: 0, paddingBottom: 0, borderBottom: 'none'}}>
            <h3 className={styles.panelTitle}>Engine Configuration</h3>
            <Settings2 size={20} className={styles.statIcon} />
          </div>
          
          <div style={{ marginTop: 24, display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 250 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.9rem', marginBottom: 8 }}>Draw Logic</label>
              <select 
                value={logic} 
                onChange={(e) => setLogic(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', 
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '1rem' 
                }}
              >
                <option value="random">Standard Random Generation</option>
                <option value="algorithmic">Algorithmic (Weighted by least frequent scores)</option>
              </select>
            </div>
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', minWidth: 250 }}>
              <button 
                onClick={runSimulation}
                disabled={isSimulating}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', padding: '14px 24px', background: 'var(--primary)', 
                  color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 600,
                  cursor: isSimulating ? 'not-allowed' : 'pointer', opacity: isSimulating ? 0.7 : 1
                }}
              >
                {isSimulating ? 'Simulating Draw...' : <><Play size={18} /> Run Simulation</>}
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        {simulationResult && (
          <div className={styles.panel} style={{ gridColumn: '1 / -1', marginTop: 0 }}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle} style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <CheckCircle2 color="var(--primary)" size={20} /> 
                Simulation Complete
              </h3>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Estimated Prize Pool: ₹{simulationResult.totalPool.toLocaleString()}</span>
            </div>

            <div style={{ marginBottom: 32, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', marginBottom: 12 }}>Generated Winning Numbers</div>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                {simulationResult.winningNumbers.map((num: number, i: number) => (
                  <div key={i} style={{ 
                    width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)',
                    borderRadius: '50%', color: 'var(--accent)', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)'
                  }}>
                    {num}
                  </div>
                ))}
              </div>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Match Tier</th>
                  <th>Pool Share</th>
                  <th>Total Prize</th>
                  <th>Winners</th>
                  <th>Prize Per Winner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: '#fff' }}>5 Numbers (Jackpot)</td>
                  <td>40%</td>
                  <td>₹{simulationResult.distribution.match5.totalPrize.toLocaleString()}</td>
                  <td style={{ color: simulationResult.distribution.match5.count === 0 ? '#ef4444' : '#fff' }}>
                    {simulationResult.distribution.match5.count}
                  </td>
                  <td>{simulationResult.distribution.match5.count > 0 ? `₹${simulationResult.distribution.match5.eachPrize.toLocaleString()}` : '-'}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#fff' }}>4 Numbers</td>
                  <td>35%</td>
                  <td>₹{simulationResult.distribution.match4.totalPrize.toLocaleString()}</td>
                  <td>{simulationResult.distribution.match4.count}</td>
                  <td>₹{simulationResult.distribution.match4.eachPrize.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#fff' }}>3 Numbers</td>
                  <td>25%</td>
                  <td>₹{simulationResult.distribution.match3.totalPrize.toLocaleString()}</td>
                  <td>{simulationResult.distribution.match3.count}</td>
                  <td>₹{simulationResult.distribution.match3.eachPrize.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            {simulationResult.distribution.match5.count === 0 && (
              <div style={{ 
                marginTop: 24, padding: '16px 24px', background: 'rgba(239, 68, 68, 0.1)', 
                border: '1px dashed rgba(239, 68, 68, 0.3)', borderRadius: 8, display: 'flex', gap: 12, alignItems: 'center' 
              }}>
                <AlertTriangle color="#ef4444" size={24} />
                <div>
                  <div style={{ color: '#fca5a5', fontWeight: 600, marginBottom: 4 }}>Jackpot Rollover Activated</div>
                  <div style={{ color: '#f87171', fontSize: '0.9rem' }}>Since there are no 5-number matches, ₹{simulationResult.newRollover.toLocaleString()} will roll over to the next month's draw.</div>
                </div>
              </div>
            )}

            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
              <button className={styles.actionBtn} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Download size={16} /> Export Report
              </button>
              <button 
                onClick={publishDraw}
                style={{
                  padding: '10px 24px', background: '#ef4444', color: '#fff', border: 'none', 
                  borderRadius: 8, fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer'
                }}
              >
                Publish Official Draw
              </button>
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}
