import React from 'react';
import Link from 'next/link';
import { Target, CheckCircle2, Heart, Trophy, CreditCard } from 'lucide-react';
import styles from '@/components/landing/LandingHero.module.css';

export default function HowItWorksPage() {
  const steps = [
    {
      title: 'Join the Platform',
      icon: <CreditCard size={32} color="var(--primary)" />,
      desc: 'Sign up for a Monthly or Yearly subscription. We use Stripe to ensure absolute security for your financial data.'
    },
    {
      title: 'Choose Your Charity',
      icon: <Heart size={32} color="var(--primary)" />,
      desc: 'Browse our directory and select the charity you want to support. You control how your impact is distributed.'
    },
    {
      title: 'Log Your Scores',
      icon: <Target size={32} color="var(--primary)" />,
      desc: 'Play a round of golf and log your stableford score (1-45). Our system automatically tracks your 5 most recent rolling scores.'
    },
    {
      title: 'Win Cash Prizes',
      icon: <Trophy size={32} color="var(--primary)" />,
      desc: 'Every month, if you have 5 valid scores logged, your lowest score becomes your sweeping entry ticket!'
    }
  ];

  return (
    <div className={styles.pageWrap}>
      <section className={styles.heroSection} style={{ minHeight: '50vh', paddingBottom: '2rem' }}>
        <div className={styles.heroBg}></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.headline}>How It Works</h1>
          <p className={styles.subHeadline} style={{ maxWidth: '700px', margin: '0 auto' }}>
            A detailed breakdown of the ImpactGolf subscription ecosystem and how you participate.
          </p>
        </div>
      </section>

      <section className={styles.featuresSection} style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className={styles.featuresGrid} style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto', gap: '2rem' }}>
            
            {steps.map((step, idx) => (
              <div key={idx} className={styles.featureCard} style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'left', gap: '1.5rem', padding: '2rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                  {step.icon}
                </div>
                <div>
                  <h3 className={styles.featureTitle} style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Step {idx + 1}: {step.title}</h3>
                  <p className={styles.featureDesc} style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </div>
            ))}

          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '4rem' }}>
            <Link href="/subscribe" className="btn-primary" style={{ display: 'inline-flex', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
