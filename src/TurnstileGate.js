import React, { useState, useEffect } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

const REAL_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY || 'bcf14edbf54086e1d875d18796ec79aa';
// Cloudflare's official test key — always passes, works on any domain (localhost, etc.)
const TEST_SITE_KEY = '1x00000000000000000000AA';
const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const SITE_KEY = IS_LOCAL ? TEST_SITE_KEY : REAL_SITE_KEY;

const SESSION_KEY = 'ulac_turnstile_verified';

export default function TurnstileGate({ children }) {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dots, setDots] = useState('');

  // Check if already verified this session
  useEffect(() => {
    const isVerified = sessionStorage.getItem(SESSION_KEY) === 'true';
    if (isVerified) {
      setVerified(true);
    }
    setLoading(false);
  }, []);

  // Animate the loading dots
  useEffect(() => {
    if (verified) return;
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 450);
    return () => clearInterval(interval);
  }, [verified]);

  const handleSuccess = (token) => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setVerified(true);
  };

  const handleError = () => {
    setError(true);
  };

  const handleExpire = () => {
    setError(true);
  };

  if (loading) return null;
  if (verified) return children;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
      zIndex: 99999,
      gap: '2rem',
    }}>
      {/* Spinner Ring */}
      <div style={{ position: 'relative', width: '52px', height: '52px' }}>
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          style={{ animation: 'ulac-spin 1s linear infinite' }}
        >
          <circle
            cx="26"
            cy="26"
            r="22"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          <circle
            cx="26"
            cy="26"
            r="22"
            fill="none"
            stroke="#111827"
            strokeWidth="3"
            strokeDasharray="138"
            strokeDashoffset="104"
            strokeLinecap="round"
          />
        </svg>

        <style>{`
          @keyframes ulac-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes ulac-fade-in {
            from { opacity: 0; transform: translateY(6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>

      {/* Text */}
      <div style={{
        textAlign: 'center',
        animation: 'ulac-fade-in 0.5s ease',
      }}>
        <p style={{
          fontSize: '1.35rem',
          fontWeight: 600,
          color: '#111827',
          margin: '0 0 0.5rem 0',
          letterSpacing: '-0.01em',
        }}>
          {error ? 'Verification failed' : 'Checking your browser'}
        </p>
        {!error && (
          <p style={{
            fontSize: '0.95rem',
            color: '#6B7280',
            margin: 0,
            fontFamily: "'Geist Mono', monospace",
            letterSpacing: '0.04em',
          }}>
            Please wait for up to 5 seconds{dots}
          </p>
        )}
        {error && (
          <p style={{
            fontSize: '0.95rem',
            color: '#6B7280',
            margin: '0 0 1rem 0',
            fontFamily: "'Geist Mono', monospace",
          }}>
            Please complete the verification below.
          </p>
        )}
      </div>

      {/* Turnstile Widget (hidden by default, auto-solves in background) */}
      <div style={{ opacity: error ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: error ? 'auto' : 'none' }}>
        <Turnstile
          siteKey={SITE_KEY}
          onSuccess={handleSuccess}
          onError={handleError}
          onExpire={handleExpire}
          options={{
            theme: 'light',
            size: 'normal',
          }}
        />
      </div>

      {/* Branding */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#6B7280',
        fontSize: '0.72rem',
        fontFamily: "'Geist Mono', monospace",
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        <span>Protected by</span>
        <svg width="16" height="16" viewBox="0 0 100 100" fill="none">
          <rect width="100" height="100" rx="8" fill="#F38020" />
          <path d="M64.5 33.5L57.5 66.5H43L50 33.5H64.5Z" fill="white" />
          <path d="M75 66.5L68 33.5H80.5L87.5 66.5H75Z" fill="white" />
          <path d="M25 66.5L32 33.5H19.5L12.5 66.5H25Z" fill="white" />
        </svg>
        <span>Cloudflare</span>
      </div>
    </div>
  );
}
