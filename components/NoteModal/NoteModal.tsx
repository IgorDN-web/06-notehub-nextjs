'use client';

import { ReactNode } from 'react';
import css from './NoteModal.module.css';

export default function NoteModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className={css.close}>
          &times;
        </button>
        <p className={css.text}>Note created successfully!</p>
      </div>
    </div>
  );
}
