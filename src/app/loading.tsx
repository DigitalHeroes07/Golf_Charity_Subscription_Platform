import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      backgroundColor: 'var(--bg-main)',
      color: 'var(--primary)'
    }}>
      <Loader2 size={48} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
      <h2 style={{ marginTop: '1rem', color: 'var(--text-main)', fontSize: '1.25rem', fontWeight: '500' }}>Loading environment...</h2>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
