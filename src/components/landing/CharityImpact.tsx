'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Users, ArrowUpRight } from 'lucide-react';
import styles from './CharityImpact.module.css';

const charities = [
  { name: "Make-A-Wish", color: "#f59e0b" },
  { name: "Macmillan Support", color: "#10b981" },
  { name: "First Tee Golf", color: "#3b82f6" },
];

export default function CharityImpact() {
  return (
    <section className={`section-padding ${styles.impactSection}`}>
      <div className={`container ${styles.container}`}>
        
        <motion.div 
          className={styles.imageCol}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.imageBlock}>
            {/* Using a placeholder gradient block since we can't load real external images reliably without configuration */}
            <div className={styles.impactVisual}>
              <div className={styles.overlayText}>
                <Heart size={48} className={styles.bigHeart} />
                <h3>Making a Real Difference</h3>
              </div>
            </div>
            
            <div className={`glass-panel ${styles.floatingCard}`}>
              <Users size={20} className={styles.accentIcon} />
              <div>
                <span className={styles.cardValue}>14,203</span>
                <span className={styles.cardLabel}>Active Supporters</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.contentCol}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className={styles.title}>Play golf. <br/>Give back.</h2>
          <p className={styles.description}>
            We believe that passion can fuel purpose. By turning your standard golf rounds into charitable engines, we collectively generate massive support for causes that matter.
          </p>
          
          <ul className={styles.featureList}>
            <li>
              <div className={styles.bullet}></div>
              Select your own charity directly from your dashboard
            </li>
            <li>
              <div className={styles.bullet}></div>
              A minimum of 10% of your subscription goes directly to them
            </li>
            <li>
              <div className={styles.bullet}></div>
              Track your lifetime impact and see community milestones
            </li>
          </ul>

          <div className={styles.charityTags}>
            {charities.map((charity, i) => (
              <span key={i} className={styles.tag}>
                <span className={styles.tagDot} style={{backgroundColor: charity.color}}></span>
                {charity.name}
              </span>
            ))}
            <Link href="/charities" className={styles.seeAllTag}>
              See All <ArrowUpRight size={14} />
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
