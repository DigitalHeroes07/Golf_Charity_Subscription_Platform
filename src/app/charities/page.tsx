'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Globe, ArrowRight } from 'lucide-react';
import styles from '@/components/charities/Charities.module.css';

import { charityDirectory } from '@/lib/data/charities';

export default function PublicCharityDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Children', 'Health', 'Sports', 'Environment', 'Global'];

  const filteredCharities = charityDirectory.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || c.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.publicPage}>
      <div className="container">
        
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Explore Supported Causes</h1>
          <p className={styles.pageSubtitle}>
            A portion of every ImpactGolf subscription automatically supports one of these amazing causes. 
            Choose your champion when you join.
          </p>
        </div>

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
          
          <select 
            className={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat} Causes</option>
            ))}
          </select>
        </div>

        <div className={styles.charityGrid}>
          {filteredCharities.map((charity, i) => (
            <motion.div 
              key={charity.id}
              className={styles.charityCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.imagePlaceholder}>
                <Globe size={48} color="rgba(255,255,255,0.2)" />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.charityName}>{charity.name}</h3>
                <p className={styles.charityDesc}>{charity.desc}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.tagline}>{charity.category}</span>
                  <a href="/subscribe" className={styles.btnSelect}>Support <ArrowRight size={14} style={{display:'inline', marginLeft:4}} /></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredCharities.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
            No charities found matching your criteria.
          </div>
        )}

      </div>
    </div>
  );
}
