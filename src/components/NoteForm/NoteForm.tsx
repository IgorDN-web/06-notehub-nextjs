"use client";

import React from "react";
import { useForm } from "react-hook-form";
import styles from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: (data: FormData) => void;
  defaultValues?: FormData;
}

export interface FormData {
  title: string;
  body: string;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: defaultValues || { title: "", body: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          rows={6}
          {...register("body", { required: "Body is required" })}
        />
        {errors.body && <p className={styles.error}>{errors.body.message}</p>}
      </div>

      <button type="submit" className={styles.button}>
        Save Note
      </button>
    </form>
  );
};

export default NoteForm;
