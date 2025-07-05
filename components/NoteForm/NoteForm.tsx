import css from "./NoteForm.module.css"
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik"
import { useId } from "react"
import * as Yup from "yup";
import type { NewNote } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api"

const initialValues: NewNote = {
    title: "",
    content: "",
    tag: "Todo"
}

const noteModalSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Name must be at least 2 characters")
      .max(50, "Name is too long")
      .required("Name is required"),
    content: Yup.string()
        .max(500, "Note content is too long"),
    tag: Yup.string()
    .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"], "Tag must be one of")
  });

interface NoteFormProps {
    onClose: () => void,
}
  
export default function NoteForm({ onClose }: NoteFormProps) {
const fieldId = useId()
  const queryClient = useQueryClient()
  
  const createMutation = useMutation({
    mutationFn: createNote,
  });

    const handleCreateNote = (
        values: NewNote,
        actions: FormikHelpers<NewNote>
    ) => {
      createMutation.mutate(values, {
        onSuccess: () => {
          actions.resetForm()
          queryClient.invalidateQueries({ queryKey: ["notes"] })
          onClose()
        }
      });
    };
return <Formik
        initialValues={initialValues}
        onSubmit={handleCreateNote}
        validationSchema={noteModalSchema} >
        
<Form className={css.form}>
    <div className={css.formGroup}>
        <label htmlFor={`${fieldId}`}>Title</label>
        <Field id={`${fieldId}`} type="text" name="title" className={css.input} />
        <ErrorMessage name="title" component="span" className={css.error} />
    </div>
  
    <div className={css.formGroup}>
      <label htmlFor={`${fieldId}-content`}>Content</label>
        <Field as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
        />
      <ErrorMessage name="content" component="span" className={css.error} />
    </div>
  
    <div className={css.formGroup}>
      <label htmlFor={`${fieldId}-tag`}>Tag</label>
      <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </Field>
      <ErrorMessage name="tag" component="span" className={css.error} />
    </div>
  
    <div className={css.actions}>
      <button type="button" className={css.cancelButton} onClick={onClose}>
        Cancel
      </button>
      <button
        type="submit"
        className={css.submitButton}
        disabled={false}
      >
        Create note
      </button>
    </div>
</Form>
</Formik>
}