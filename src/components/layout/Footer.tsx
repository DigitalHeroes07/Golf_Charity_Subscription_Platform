import React from 'react';
import Link from 'next/link';
import { Heart, Youtube, Instagram, Facebook } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <Heart className={styles.logoIcon} strokeWidth={2.5} size={24} />
              <span className={styles.logoText}>Impact<span className={styles.logoHighlight}>Golf</span></span>
            </Link>
            <p className={styles.brandDesc}>
              The premium golf subscription platform that empowers players to give back while offering thrilling monthly prize draws.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon}><Youtube size={20} /></a>
              <a href="#" className={styles.socialIcon}><Instagram size={20} /></a>
              <a href="#" className={styles.socialIcon}><Facebook size={20} /></a>
            </div>
          </div>
          
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Platform</h4>
            <ul className={styles.linkList}>
              <li><Link href="/how-it-works">How it Works</Link></li>
              <li><Link href="/draws">Monthly Draw</Link></li>
              <li><Link href="/charities">Charities</Link></li>
              <li><Link href="/subscribe">Pricing</Link></li>
            </ul>
          </div>
          
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className={styles.subscribeCol}>
            <h4 className={styles.colTitle}>Stay Updated</h4>
            <p className={styles.subscribeDesc}>Get notified about new charities and prize pool milestones.</p>
            <form className={styles.subscribeForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className={styles.input} />
              <button type="submit" className={styles.submitBtn}>Join</button>
            </form>
          </div>
          
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {year} ImpactGolf. A Golf Charity Subscription Platform.</p>
          <p>Built for Digital Heroes Selection Process.</p>
        </div>
      </div>
    </footer>
  );
}
