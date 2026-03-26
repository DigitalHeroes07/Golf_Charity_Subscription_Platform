'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './LandingHero.module.css';

export default function LandingHero() {
  return (
    <section className={styles.heroSection}>
      {/* Background glowing orbs */}
      <div className={styles.glowOrb1}></div>
      <div className={styles.glowOrb2}></div>

      <div className={`container ${styles.heroContainer}`}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ShieldCheck size={16} className={styles.badgeIcon} />
            <span>The Premium Golf Subscription</span>
          </motion.div>

          <h1 className={styles.title}>
            Play Golf. <br />
            <span className="gradient-text-accent">Change Lives.</span> <br />
            Win Monthly Prizes.
          </h1>
          
          <p className={styles.subtitle}>
            Join the exclusive community where your golf scores enter you into monthly cash draws, while automatically supporting charities with every round you play.
          </p>
          
          <div className={styles.ctaGroup}>
            <Link href="/subscribe" className={`btn-primary ${styles.primaryBtn}`}>
              Join the Club <ArrowRight size={20} />
            </Link>
            <Link href="/how-it-works" className={`btn-secondary ${styles.secondaryBtn}`}>
              See How It Works
            </Link>
          </div>
          
          <motion.div 
            className={styles.statsRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div className={styles.statItem}>
              <Trophy className={styles.statIcon} size={24} />
              <div>
                <span className={styles.statValue}>₹50L+</span>
                <span className={styles.statLabel}>Monthly Prizes</span>
              </div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <Heart className={styles.statIconHeart} size={24} />
              <div>
                <span className={styles.statValue}>₹1Cr+</span>
                <span className={styles.statLabel}>Charity Impact</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Visual Mockup */}
        <motion.div 
          className={styles.heroVisual}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className={`glass-panel ${styles.mockupContainer}`}>
            <div className={styles.mockupHeader}>
              <div className={styles.dots}>
                <span></span><span></span><span></span>
              </div>
              <div className={styles.mockupTitle}>My Dashboard</div>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.scoreCard}>
                <div className={styles.scoreHeader}>Your Recent Scores</div>
                <div className={styles.scoreRow}>
                  <span>Today</span>
                  <span className={styles.scoreValue}>36 pts</span>
                </div>
                <div className={styles.scoreRow}>
                  <span>Last Week</span>
                  <span className={styles.scoreValue}>42 pts</span>
                </div>
              </div>
              
              <div className={styles.drawCard}>
                <div className={styles.drawHeader}>Next Draw in 5 Days</div>
                <div className={styles.poolValue}>₹12,50,000 <span className={styles.poolLabel}>Est. Prize Pool</span></div>
                <div className={styles.selectedCharity}>
                  <Heart size={14} fill="var(--primary)" color="var(--primary)" /> 
                  Supporting: Make-A-Wish
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
