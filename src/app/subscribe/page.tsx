'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Heart, Trophy, ArrowRight } from 'lucide-react';
import styles from '@/components/subscription/Subscribe.module.css';
import { useHistory } from '@/hooks/useHistory';

const plans = [
  {
    id: 'monthly',
    name: 'Monthly Member',
    price: '₹1,499',
    interval: 'month',
    features: [
      'Enter 5 recent golf scores',
      '1 automatic entry to monthly cash draw',
      'Minimum 10% goes directly to chosen charity',
      'Member-only dashboard access'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly Foundation',
    price: '₹14,990',
    interval: 'year',
    features: [
      'Enter 5 recent golf scores',
      '1 automatic entry to monthly cash draw',
      'Minimum 10% goes directly to chosen charity',
      'Member-only dashboard access',
      'Save ₹30 compared to monthly billing'
    ],
    popular: true
  }
];

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('yearly');
  const [loading, setLoading] = useState<boolean>(false);
  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interval: selectedPlan })
      });
      
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please ensure you are logged in.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.badge}
          >
            <ShieldCheck size={16} className={styles.badgeIcon} />
            <span>Secure Checkout</span>
          </motion.div>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join the Impact<span className={styles.highlight}>Golf</span> Community
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose a plan that fits your game. Track scores, win monthly prizes, and support charities seamlessly.
          </motion.p>
        </div>

        <div className={styles.planGrid}>
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.id}
              className={`${styles.planCard} ${selectedPlan === plan.id ? styles.selected : ''} ${plan.popular ? styles.popular : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
            >
              {plan.popular && <div className={styles.popularBadge}>Most Popular</div>}
              
              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.interval}>/{plan.interval}</span>
                </div>
              </div>

              <div className={styles.planFeatures}>
                {plan.features.map((feature, i) => (
                  <div key={i} className={styles.featureItem}>
                    <div className={styles.checkWrapper}>
                      <Check size={14} className={styles.checkIcon} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.actionContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button 
            className={`btn-primary ${styles.checkoutBtn}`} 
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Preparing Checkout...' : 'Continue to Checkout'} 
            {!loading && <ArrowRight size={20} />}
          </button>
          
          <div className={styles.guaranteeText}>
            <Heart size={16} color="var(--primary)" /> Minimum 10% directly supports your chosen charity.
          </div>
        </motion.div>

      </div>
    </div>
  );
}
