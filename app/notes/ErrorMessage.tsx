"use client";

import css from "./error.module.css";

interface ErrorComponentProps {
  error: Error;
}

export default function Error({ error }: ErrorComponentProps) {
  return (
    <div className={css.error}>
      <strong>Error</strong>
      <p>{error.message}</p>
    </div>
  );
}
