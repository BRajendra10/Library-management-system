import React, { useContext } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiBookOpen } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import { postBookData, updateBookData } from "../features/BookSlice";

// ✅ Simplified Validation Schema
const BookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  category: Yup.string().required("Category is required"),
  isbn: Yup.array()
    .of(Yup.string().required("ISBN required"))
    .min(1, "At least one ISBN is required"),
  coverImage: Yup.string().url("Must be a valid URL").required("Cover image is required"),
  tags: Yup.array().of(Yup.string().required("Tag required")),
  copiesAvailable: Yup.number().min(1, "Must have at least 1 copy").required(),
  description: Yup.string().required("Description is required"),
});

export default function AddBookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId, editedBook } = useContext(BookContext);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FiBookOpen className="text-stone-600" />
          {bookId ? "Edit Book" : "Add Book"}
        </h2>
      </div>

      <Formik
        initialValues={{
          title: editedBook?.title || "",
          author: editedBook?.author || "",
          category: editedBook?.category || "",
          isbn: editedBook?.isbn || [""],
          coverImage: editedBook?.coverImage || "",
          tags: editedBook?.tags || [""],
          copiesAvailable: editedBook?.copiesAvailable || 1,
          description: editedBook?.description || "",
        }}
        validationSchema={BookSchema}
        onSubmit={(values, { resetForm }) => {
          if (bookId) {
            dispatch(updateBookData({ id: bookId, updates: values }));
          } else {
            dispatch(postBookData(values));
          }
          resetForm();
          navigate("/books");
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="grid grid-cols-1 gap-8">
            {/* Basic Info */}
            <section className="grid sm:grid-cols-2 gap-6">
              <FormInput name="title" label="Title" placeholder="Enter book title" />
              <FormInput name="author" label="Author" placeholder="Enter author name" />
              <FormInput name="category" label="Category" placeholder="e.g. Science" />
              <FormInput
                name="coverImage"
                label="Cover Image URL"
                placeholder="https://..."
              />
            </section>

            {/* ISBN + Tags */}
            <section className="grid sm:grid-cols-2 gap-6">
              {/* ISBN FieldArray */}
              <FieldArray name="isbn">
                {({ push, remove }) => (
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      ISBN(s)
                    </label>
                    {values.isbn.map((_, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Field
                          name={`isbn.${index}`}
                          placeholder="Enter ISBN"
                          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-stone-900"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="text-sm text-blue-600"
                    >
                      + Add ISBN
                    </button>
                  </div>
                )}
              </FieldArray>

              {/* Tags FieldArray */}
              <FieldArray name="tags">
                {({ push, remove }) => (
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Tags
                    </label>
                    {values.tags.map((_, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <Field
                          name={`tags.${index}`}
                          placeholder="Enter tag"
                          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-stone-900"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="text-sm text-blue-600"
                    >
                      + Add Tag
                    </button>
                  </div>
                )}
              </FieldArray>
            </section>

            {/* Copies Available + Description */}
            <section className="grid sm:grid-cols-2 gap-6">
              <FormInput
                name="copiesAvailable"
                type="number"
                label="Copies Available"
                placeholder="e.g. 3"
              />
              <FormTextarea
                name="description"
                label="Description"
                placeholder="Write a short description..."
              />
            </section>

            {/* Submit */}
            <div className="pt-4 border-t flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-stone-900 text-white rounded-md"
              >
                Save Book
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// ✅ Reusable Input Components
const FormInput = ({ name, label, type = "text", placeholder }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-stone-700">
      {label}
    </label>
    <Field
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-900"
    />
    <ErrorMessage name={name} component="p" className="text-sm text-red-500 mt-1" />
  </div>
);

const FormTextarea = ({ name, label, placeholder }) => (
  <div className="flex flex-col sm:col-span-2">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-stone-700">
      {label}
    </label>
    <Field
      as="textarea"
      name={name}
      id={name}
      rows="4"
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-900"
    />
    <ErrorMessage name={name} component="p" className="text-sm text-red-500 mt-1" />
  </div>
);
