import React from 'react';
import Link from 'next/link';
import { Trophy, ArrowRight, Target, HeartHandshake, CircleDollarSign } from 'lucide-react';
import styles from '@/components/landing/LandingHero.module.css';

export default function DrawsPage() {
  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section className={styles.heroSection} style={{ minHeight: '60vh', paddingBottom: '4rem' }}>
        <div className={styles.heroBg}></div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.badge}>
            <Trophy size={16} className={styles.badgeIcon} />
            <span>Monthly Prize Draws</span>
          </div>
          <h1 className={styles.headline}>Play Golf. Win Prizes.</h1>
          <p className={styles.subHeadline} style={{ maxWidth: '800px', margin: '0 auto' }}>
             Every valid score you log enters you into our algorithmic monthly sweepstakes. 
             We split the subscription pool to guarantee massive impact and huge payouts.
          </p>
        </div>
      </section>

      {/* Mechanics Section */}
      <section className={styles.featuresSection} style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The Revenue Split</h2>
            <p className={styles.sectionSubtitle}>Transparency is our core. Here is exactly where the membership pool goes each month.</p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrap}>
                <CircleDollarSign size={24} className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>40% to Operations</h3>
              <p className={styles.featureDesc}>Funds the platform overhead, algorithms, administration, and marketing to keep the prize pool growing.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrap}>
                <HeartHandshake size={24} className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>35% to Charities</h3>
              <p className={styles.featureDesc}>Directly deposited into the charities chosen precisely by our members (minimum 10% per member selection).</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrap}>
                <Target size={24} className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>25% to The Draw</h3>
              <p className={styles.featureDesc}>This forms the monthly prize pool! If the jackpot isn't won, 10% rolls over to the next month to create massive prizes.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
             <Link href="/subscribe" className="btn-primary" style={{ display: 'inline-flex', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
               Enter The Next Draw <ArrowRight size={20} />
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
