"use client";

import css from "./error.module.css";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <div className={css.error}>
      <strong>Error:</strong>
      <p>{error?.message ?? "Unknown error"}</p>
    </div>
  );
}
