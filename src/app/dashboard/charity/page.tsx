'use client';

import React, { useState } from 'react';
import styles from '@/components/charities/Charities.module.css';
import { Heart, Search, CheckCircle2 } from 'lucide-react';
import { charityDirectory } from '@/lib/data/charities';
import { useHistory } from '@/hooks/useHistory';

export default function DashboardCharityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { addHistoryEvent } = useHistory();
  
  // Custom user dashboard state
  const [selectedCharityId, setSelectedCharityId] = useState<string>('1');
  const [contributionPercent, setContributionPercent] = useState<number>(10);
  const [subFee] = useState(1499.00);

  const handleSave = () => {
    const selectedTitle = charityDirectory.find(c => c.id === selectedCharityId)?.name || 'Unknown Charity';
    addHistoryEvent({
      type: 'charity',
      title: `Selected ${selectedTitle}`,
      amount: `${contributionPercent}%`,
    });
    alert(`Preferences saved! You are contributing ${contributionPercent}% (₹${((contributionPercent/100)*subFee).toFixed(2)}/mo) to the selected charity.`);
  };

  const filteredCharities = charityDirectory.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContent}>
      
      <header className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Your Charity Impact</h1>
        <p className={styles.dashboardSubtitle}>Manage exactly where your subscription contribution goes.</p>
      </header>

      {/* Control Panel for existing selected charity */}
      <div className={`glass-panel ${styles.selectionPanel}`}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Contribution Settings</h2>
          <div className={styles.currentSelection}>
            <span className={styles.selectionLabel}>Supporting:</span>
            <span className={styles.selectionName}>
              <Heart size={16} fill="var(--primary)" /> 
              {charityDirectory.find(c => c.id === selectedCharityId)?.name || 'None'}
            </span>
          </div>
        </div>

        <div className={styles.sliderContainer}>
          <div className={styles.sliderHeader}>
            <span>Subscription Contribution Percentage (Min 10%)</span>
            <span className={styles.sliderVal}>{contributionPercent}%</span>
          </div>
          
          <input 
            type="range" 
            className={styles.sliderInput}
            min="10" 
            max="100" 
            step="5"
            value={contributionPercent} 
            onChange={(e) => setContributionPercent(Number(e.target.value))}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.8rem', color: '#64748b' }}>
            <span>Standard (10%)</span>
            <span>All-In (100%)</span>
          </div>
        </div>

        <div className={styles.contributionCalc}>
          <div>
            <div className={styles.calcLabel}>Estimated Monthly Impact</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 4 }}>Based on ₹1,499/mo subscription</div>
          </div>
          <div className={styles.calcValue}>
            ₹{((contributionPercent / 100) * subFee).toFixed(2)}
          </div>
        </div>

        <div className={styles.actionRow}>
          <button className="btn-primary" onClick={handleSave}>Save Preferences</button>
        </div>
      </div>

      <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: 24 }}>Browse Alternatives</h2>

      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} size={20} />
          <input 
            type="text" 
            placeholder="Search charities..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.charityGrid}>
        {filteredCharities.map(charity => {
          const isSelected = selectedCharityId === charity.id;
          return (
            <div 
              key={charity.id}
              className={`${styles.charityCard} ${isSelected ? styles.selectedCard : ''}`}
            >
              <div className={styles.cardBody}>
                <h3 className={styles.charityName}>{charity.name}</h3>
                <p className={styles.charityDesc}>{charity.desc}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.tagline}>{charity.category}</span>
                  
                  {isSelected ? (
                    <button className={styles.btnSelected}>
                      <CheckCircle2 size={16} style={{display:'inline', marginRight: 4}} /> Active
                    </button>
                  ) : (
                    <button 
                      className={styles.btnSelect}
                      onClick={() => setSelectedCharityId(charity.id)}
                    >
                      Select
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  );
}
