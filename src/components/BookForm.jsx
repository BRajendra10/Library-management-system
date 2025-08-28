import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { FiBookOpen, FiHash, FiBarChart2, FiFileText } from "react-icons/fi";
import { postBookData } from "../features/BookSlice";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import { updateBook } from "../features/BookSlice";

// ✅ Validation Schema based on book data structure
const BookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  publisher: Yup.string().required("Publisher is required"),
  publicationDate: Yup.date().required("Publication date is required"),
  edition: Yup.string(),
  series: Yup.string(),
  language: Yup.string().required("Language is required"),
  pageCount: Yup.number().positive(),
  callNumber: Yup.string(),
  department: Yup.string(),
  subject: Yup.string(),
  status: Yup.string().required("Status is required"),
  description: Yup.string(),
  isbn: Yup.array().of(Yup.string().required("ISBN required")),
  keywords: Yup.array().of(Yup.string()),
  thumbnail: Yup.string().url("Must be a valid URL"),
});

export default function AddBookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId, editedBook } = useContext(BookContext);
  console.log(bookId, editedBook);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8 overflow-scroll">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FiBookOpen className="text-stone-600" />
          Add / Edit Book
        </h2>
      </div>

      <Formik
        initialValues={{
          title: editedBook?.title || "",
          author: editedBook?.author || "",
          publisher: editedBook?.publisher || "",
          publicationDate: editedBook?.publicationDate || "",
          edition: editedBook?.edition || "",
          series: editedBook?.series || "",
          language: editedBook?.language || "",
          pageCount: editedBook?.pageCount || "",
          callNumber: editedBook?.callNumber || "",
          department: editedBook?.department || "",
          subject: editedBook?.subject || "",
          status: "Available",
          description: editedBook?.description || "",
          isbn: editedBook?.isbn || [""],
          keywords: editedBook?.keywords || [""],
          thumbnail: editedBook?.thumbnail || "",
        }}
        validationSchema={BookSchema}
        onSubmit={(values, { resetForm }) => {
          if (bookId) {
            dispatch(updateBook({ id: bookId, newBook: values }))
          } else {
            dispatch(postBookData(values));
          }
          navigate("/books");
          resetForm();
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT COLUMN */}
            <div className="space-y-8">
              {/* 🔹 Basic Info */}
              <section>
                <div className="grid grid-cols-2 gap-6">
                  <FormInput name="title" label="Book Title" placeholder="Enter title" />
                  <FormInput name="author" label="Author" placeholder="Enter author" />
                  <FormInput name="publisher" label="Publisher" placeholder="Enter publisher" />
                  <FormInput name="publicationDate" label="Publication Date" type="date" />
                  <FormInput name="edition" label="Edition" placeholder="Enter edition" />
                  <FormInput name="series" label="Series" placeholder="Enter series" />
                </div>
              </section>

              {/* 🔹 Identifiers */}
              <section>
                <div className="grid grid-cols-2 gap-6">
                  {/* Multiple ISBNs */}
                  <FieldArray name="isbn">
                    {({ push, remove }) => (
                      <div className="col-span-2">
                        <label className="mb-2 block text-sm font-medium text-stone-700">ISBN(s)</label>
                        {values.isbn.map((_, index) => (
                          <div key={index} className="flex items-center gap-2 mb-2">
                            <Field
                              name={`isbn.${index}`}
                              placeholder="Enter ISBN"
                              className="flex-1 px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-900"
                            />
                            <button type="button" onClick={() => remove(index)} className="text-red-500">✕</button>
                          </div>
                        ))}
                        <button type="button" onClick={() => push("")} className="text-sm text-blue-600">
                          + Add ISBN
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  <FormInput name="language" label="Language" placeholder="Enter language" />
                  <FormInput name="pageCount" label="Pages" type="number" placeholder="e.g. 1312" />
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              {/* 🔹 Metadata */}
              <section>
                <div className="grid grid-cols-2 gap-6">
                  <FormInput name="callNumber" label="Call Number" placeholder="Enter call number" />
                  <FormInput name="department" label="Department" placeholder="Enter department" />
                  <FormInput name="subject" label="Subject" placeholder="Enter subject" />
                  <FormInput name="status" label="Status" placeholder="Available / Borrowed" />
                  <FormInput name="thumbnail" label="Thumbnail URL" placeholder="https://..." />
                </div>
              </section>

              {/* 🔹 Extra Details */}
              <section>
                <div className="space-y-6">
                  {/* Multiple Keywords */}
                  <FieldArray name="keywords">
                    {({ push, remove }) => (
                      <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">Keywords</label>
                        {values.keywords.map((_, index) => (
                          <div key={index} className="flex items-center gap-2 mb-2">
                            <Field
                              name={`keywords.${index}`}
                              placeholder="Enter keyword"
                              className="flex-1 px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-900"
                            />
                            <button type="button" onClick={() => remove(index)} className="text-red-500">✕</button>
                          </div>
                        ))}
                        <button type="button" onClick={() => push("")} className="text-sm text-blue-600">
                          + Add Keyword
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  <FormTextarea name="description" label="Description" placeholder="Write a short description..." />
                </div>
              </section>
            </div>

            {/* Submit Button - Full Width */}
            <div className="lg:col-span-2 pt-6 border-t flex justify-end">
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

// ✅ Reusable input components
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
      className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-900"
    />
    <ErrorMessage name={name} component="p" className="text-sm text-red-500 mt-1" />
  </div>
);

const FormTextarea = ({ name, label, placeholder }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-stone-700">
      {label}
    </label>
    <Field
      as="textarea"
      name={name}
      id={name}
      rows="4"
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-900"
    />
    <ErrorMessage name={name} component="p" className="text-sm text-red-500 mt-1" />
  </div>
);
