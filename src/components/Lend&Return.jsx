import React from "react";
import { useFormik } from "formik";
import { object, string, date, number } from "yup";
import { NavLink } from "react-router-dom";

//
// Lending Form
//
const LendingForm = () => {
  const schema = object({
    memberId: string().required("Member ID is required"),
    bookId: string().required("Book ID is required"),
    issueDate: date().required("Issue Date is required"),
    dueDate: date()
      .required("Due Date is required")
      .min(new Date(), "Due Date must be after today"),
    remarks: string(),
  });

  const formik = useFormik({
    initialValues: {
      transactionId: `lend-${Date.now()}`,
      memberId: "",
      bookId: "",
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: "",
      remarks: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("Lend Data:", values);
      alert("Book Lent Successfully!");
    },
  });

  return (
    <div className="w-full h-full flex justify-center items-center bg-stone-100">
      <div className="w-[40rem] flex flex-col bg-white shadow-lg rounded-xl">
        <div className="w-full h-[4rem] grid grid-cols-2 bg-stone-100">
          <NavLink
            className={({ isActive }) => `flex items-center p-4 ${isActive ? "bg-white text-black" : ""}`}
            to={"/lend"}>Overview</NavLink>
          <NavLink
            className={({ isActive }) => `flex items-center p-4 ${isActive ? "bg-white text-black" : ""}`}
            to={"/return"}>Overview</NavLink>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full p-6 space-y-5"
        >
          <input
            name="memberId"
            placeholder="Member ID"
            value={formik.values.memberId}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          {formik.errors.memberId && (
            <p className="text-red-500 text-sm">{formik.errors.memberId}</p>
          )}

          <input
            name="bookId"
            placeholder="Book ID"
            value={formik.values.bookId}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          {formik.errors.bookId && (
            <p className="text-red-500 text-sm">{formik.errors.bookId}</p>
          )}

          <input
            type="date"
            name="issueDate"
            value={formik.values.issueDate}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          {formik.errors.issueDate && (
            <p className="text-red-500 text-sm">{formik.errors.issueDate}</p>
          )}

          <input
            type="date"
            name="dueDate"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          {formik.errors.dueDate && (
            <p className="text-red-500 text-sm">{formik.errors.dueDate}</p>
          )}

          <textarea
            name="remarks"
            placeholder="Remarks (optional)"
            value={formik.values.remarks}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg"
          >
            Lend Book
          </button>
        </form>
      </div>
    </div>
  );
};

//
// Returning Form
//
const ReturningForm = () => {
  const schema = object({
    returnDate: date().required("Return Date is required"),
    condition: string().required("Condition is required"),
    fine: number().nullable(),
    remarks: string(),
  });

  const formik = useFormik({
    initialValues: {
      transactionId: `return-${Date.now()}`,
      memberId: "",
      bookId: "",
      returnDate: new Date().toISOString().slice(0, 10),
      condition: "",
      fine: "",
      remarks: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("Return Data:", values);
      alert("Book Returned Successfully!");
    },
  });

  return (
    <div className="w-full h-full flex justify-center items-center bg-stone-100">
      <div className="w-[40rem] flex flex-col bg-white shadow-lg rounded-xl">
        <div className="w-full h-[4rem] grid grid-cols-2 bg-stone-100">
          <NavLink
            className={({ isActive }) => `flex items-center p-4 ${isActive ? "bg-white text-black" : ""}`}
            to={"/lend"}>Overview</NavLink>
          <NavLink
            className={({ isActive }) => `flex items-center p-4 ${isActive ? "bg-white text-black" : ""}`}
            to={"/return"}>Overview</NavLink>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full p-6 space-y-5 mt-10"
        >
          <input
            type="date"
            name="returnDate"
            value={formik.values.returnDate}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          {formik.errors.returnDate && (
            <p className="text-red-500 text-sm">{formik.errors.returnDate}</p>
          )}

          <select
            name="condition"
            value={formik.values.condition}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Condition</option>
            <option value="Good">Good</option>
            <option value="Damaged">Damaged</option>
            <option value="Missing">Missing</option>
          </select>
          {formik.errors.condition && (
            <p className="text-red-500 text-sm">{formik.errors.condition}</p>
          )}

          <input
            type="number"
            name="fine"
            placeholder="Fine (if any)"
            value={formik.values.fine}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          {formik.errors.fine && (
            <p className="text-red-500 text-sm">{formik.errors.fine}</p>
          )}

          <textarea
            name="remarks"
            placeholder="Remarks (optional)"
            value={formik.values.remarks}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg"
          >
            Return Book
          </button>
        </form>
      </div>
    </div>
  );
};

export { LendingForm, ReturningForm };
