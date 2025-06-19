'use client';

import { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface Props {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search notes..."
      className={css.input}
      onChange={handleChange}
    />
  );
}
