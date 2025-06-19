'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNote } from '@/lib/api/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const formik = useFormik({
    initialValues: { title: '', content: '' },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: values => {
      mutate(values);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        className={css.input}
      />
      <textarea
        name="content"
        placeholder="Content"
        value={formik.values.content}
        onChange={formik.handleChange}
        className={css.textarea}
      />
      <button type="submit" className={css.button}>
        Create
      </button>
    </form>
  );
}
