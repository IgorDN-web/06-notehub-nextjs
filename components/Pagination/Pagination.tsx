'use client';

import css from './Pagination.module.css';

interface Props {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export default function Pagination({ page, onPageChange, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className={css.pagination}>
      {pages.map(p => (
        <li key={p}>
          <button
            onClick={() => onPageChange(p)}
            className={p === page ? css.active : ''}
          >
            {p}
          </button>
        </li>
      ))}
    </ul>
  );
}
