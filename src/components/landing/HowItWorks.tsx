'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Edit3, Gift, BarChart4 } from 'lucide-react';
import styles from './HowItWorks.module.css';

const steps = [
  {
    icon: <CreditCard size={32} />,
    title: "Subscribe Monthly",
    description: "Join the platform with a recurring monthly or yearly subscription to get access to the prize draws and charity support."
  },
  {
    icon: <Edit3 size={32} />,
    title: "Log Your Scores",
    description: "Enter your latest Stableford scores (1-45). Your last 5 scores are kept rolling and used to generate your entries."
  },
  {
    icon: <BarChart4 size={32} />,
    title: "Algorithm Matches",
    description: "Our draw engine maps numbers to your entered scores. You can win matching 3, 4, or 5 numbers. 5 matches takes the Jackpot!"
  },
  {
    icon: <Gift size={32} />,
    title: "Support Charity",
    description: "A guaranteed percentage of your subscription goes directly to your chosen charity. Doing good is built in."
  }
];

export default function HowItWorks() {
  return (
    <section className={`section-padding ${styles.howItWorksSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>The Mechanics of Winning</h2>
          <p className={styles.subtitle}>
            A modern, transparent system that makes every round of golf count for you and your chosen cause.
          </p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className={`glass-panel ${styles.card}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className={styles.iconWrapper}>
                {step.icon}
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
