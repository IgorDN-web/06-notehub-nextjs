import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import type { CreateNoteValues } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Title is required!"),
  content: Yup.string().max(500), // можно добавить .required() если нужно
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required!"),
});

const initialValues: CreateNoteValues = {
  title: "",
  content: "",  // убедитесь, что content обязательный в типе
  tag: "Todo",
};

export interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const mutationCreate = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
      toast.success("Success! Your note has been saved.");
    },
    onError: () => {
      toast.error("Oops! The note couldn't be saved.");
    },
  });

  function handleSubmit(
    values: CreateNoteValues,
    actions: FormikHelpers<CreateNoteValues>
  ) {
    // Гарантируем, что content — строка (если undefined, то пустая строка)
    const payload = {
      ...values,
      content: values.content ?? "",
    };
    mutationCreate.mutate(payload);
    actions.resetForm();
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            {mutationCreate.isPending ? (
              <button
                type="submit"
                className={css.submitButton}
                disabled={true}
              >
                Note creation...
              </button>
            ) : (
              <button
                type="submit"
                className={css.submitButton}
                disabled={false}
              >
                Create note
              </button>
            )}
          </div>
        </Form>
      </Formik>
      <Toaster />
    </>
  );
}
