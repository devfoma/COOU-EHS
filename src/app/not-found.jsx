import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#051424',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '64px', margin: '0 0 10px', color: '#4ae176' }}>404</h1>
      <h2 style={{ fontSize: '24px', margin: '0 0 20px' }}>Page Not Found</h2>
      <p style={{ color: '#d4e4fa', opacity: 0.7, maxWidth: '480px', margin: '0 0 30px', lineHeight: '1.6' }}>
        The campus safety page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" style={{
        padding: '12px 24px',
        background: '#4ae176',
        color: '#051424',
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        transition: 'opacity 0.2s'
      }}>
        Back to Safety Center
      </Link>
    </div>
  );
}
