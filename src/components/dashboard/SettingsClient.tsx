'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/components/dashboard/Settings.module.css';
import { Camera, CreditCard, History, Edit3, Heart, Save, CheckCircle2, Trash2 } from 'lucide-react';
import { useHistory } from '@/hooks/useHistory';

export default function SettingsClient({ initialEmail, initialName }: { initialEmail: string, initialName: string }) {
  const { history, addHistoryEvent, clearHistory } = useHistory();
  const [displayName, setDisplayName] = useState(initialName);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedAvatar = localStorage.getItem('user_avatar');
    if (storedAvatar) setAvatarPreview(storedAvatar);
    
    const storedName = localStorage.getItem('user_display_name');
    if (storedName) setDisplayName(storedName);
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress to severe JPEG to guarantee it fits in 5MB limit
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
          setAvatarPreview(compressedBase64);
          
          try {
            localStorage.setItem('user_avatar', compressedBase64);
            addHistoryEvent({
              type: 'profile',
              title: 'Updated Profile Photo',
            });
          } catch (error) {
            console.error('Storage quota exceeded even after compression', error);
            alert('Image is too large to save locally even after compression. Please choose a much smaller file.');
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('user_display_name', displayName);
    addHistoryEvent({
      type: 'profile',
      title: 'Updated Profile Display Name',
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <CreditCard size={18} />;
      case 'score': return <Edit3 size={18} />;
      case 'charity': return <Heart size={18} />;
      case 'profile': return <Camera size={18} />;
      default: return <History size={18} />;
    }
  };

  return (
    <div className={styles.grid}>
      {/* Profile Card */}
      <div className={`glass-panel ${styles.card}`}>
        <div className={styles.cardHeader}>
          <Camera size={20} className={styles.iconAccent} />
          <h3 className={styles.cardTitle}>Personal Information</h3>
        </div>
        
        <div className={styles.profileLayout}>
          <div className={styles.avatarSection}>
            <label htmlFor="avatar-upload" className={styles.avatarCircle}>
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview} alt="Avatar" className={styles.avatarImage} />
              ) : (
                <Camera size={32} />
              )}
            </label>
            <input type="file" id="avatar-upload" className={styles.fileInput} accept="image/*" onChange={handleAvatarChange} />
            
            <div className={styles.avatarText}>
              <strong>Profile Photo</strong>
              <p className={styles.avatarInstructions}>Click to upload from your files or camera. JPG, PNG (Max 5MB).</p>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Display Name</label>
            <input 
              type="text" 
              className={styles.input} 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)} 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input type="email" className={styles.input} value={initialEmail} disabled />
            <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Email address cannot be changed once registered.</p>
          </div>

           <div className={styles.formGroup} style={{marginTop: '1rem'}}>
            <button className={`btn-primary ${styles.saveBtn}`} onClick={handleSave}>
              {saved ? <><CheckCircle2 size={16} /> Saved Successfully</> : <><Save size={16} /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>

      {/* History Card */}
      <div className={`glass-panel ${styles.card}`}>
        <div className={styles.cardHeader}>
          <History size={20} className={styles.iconAccent} />
          <h3 className={styles.cardTitle}>Activity History</h3>
        </div>
        
        <div className={styles.historyList}>
          {history.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Your activity history is currently empty. Activities like logging scores or picking charities will appear here.</p>
          ) : (
            history.map((work) => (
              <div key={work.id} className={styles.historyItem}>
                <div className={styles.historyIconWrap}>
                  {renderIcon(work.type)}
                </div>
                <div className={styles.historyDetails}>
                  <div className={styles.historyTitle}>{work.title}</div>
                  <div className={styles.historyDate}>{work.date}</div>
                </div>
                {work.amount && (
                  <div className={styles.historyAmount}>{work.amount}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
