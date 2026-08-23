import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Info, X } from 'lucide-react';

export default function GuideTip({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="guide-button"
        type="button"
        aria-label={`Open guide: ${title}`}
        onClick={() => setOpen(true)}
      >
        <Info size={14} />
      </button>
      {open && createPortal(
        <div className="modal-backdrop guide-modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className="modal-card guide-modal"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="modal-header">
              <div>
                <p className="eyebrow">Quick guide</p>
                <h2>{title}</h2>
              </div>
              <button className="icon-button" type="button" aria-label="Close guide" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </header>
            <p>{children}</p>
          </section>
        </div>,
        document.body
      )}
    </>
  );
}
