import React from 'react';

const BRAND_NAME = 'COOU-EHS';
const LOGO_URL = new URL('../../../ASSETS/COOU-EHS LOGO MARK.png', import.meta.url).href;

export default function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <img src={LOGO_URL} alt={`${BRAND_NAME} logo`} />
      {!compact && (
        <div>
          <strong>{BRAND_NAME}</strong>
        </div>
      )}
    </div>
  );
}
