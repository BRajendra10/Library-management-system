import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { FaUserPlus } from 'react-icons/fa6';
import { object, string, number, array } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postMemberData, updateMemberData } from '../features/MemberSlice';
import { MemberContext } from '../context/editmemberContext';

const schema = object({
  name: string().required('Name is required'),
  email: string().required('Email is required').email('Invalid email format'),
  membershipId: string().required('Membership ID is required'),
  membershipType: string()
    .required('Membership type is required')
    .oneOf(['Student', 'Admin'], 'Invalid membership type'),
  password: string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  profileImage: string().required('Profile image URL is required').url('Invalid URL format'),
  fine: number()
    .required('Fine amount is required')
    .min(0, 'Fine cannot be negative')
    .typeError('Fine must be a number'),
  status: string().required('Status is required').oneOf(['Active', 'Inactive']),
  borrowedBooks: array().default([]),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memberId, editedMember } = useContext(MemberContext);

  const formik = useFormik({
    initialValues: {
      membershipId: editedMember?.membershipId || '',
      name: editedMember?.name || '',
      email: editedMember?.email || '',
      password: editedMember?.password || '',
      membershipType: editedMember?.membershipType || 'Student',
      fine: editedMember?.fine || 0,
      status: editedMember?.status || 'Active',
      borrowedBooks: editedMember?.borrowedBooks || [],
      profileImage: editedMember?.profileImage || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (memberId) {
        dispatch(updateMemberData({ updatedMember: values, id: memberId }));
      } else {
        dispatch(postMemberData({ newMember: values }));
      }
      formik.resetForm();
      navigate('/members');
    },
  });

  const { errors, values, touched, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-stone-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-center font-semibold mb-4">
          {memberId ? 'Update Member' : 'Register Member'}
        </h2>

        <form className="w-full grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Membership ID */}
          <div>
            <label className="text-base mb-1 block" htmlFor="membershipId">Membership ID</label>
            <input
              id="membershipId"
              name="membershipId"
              type="text"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.membershipId}
            />
            {errors.membershipId && touched.membershipId && <span className="text-sm text-red-700">{errors.membershipId}</span>}
          </div>

          {/* Name */}
          <div>
            <label className="text-base mb-1 block" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.name}
            />
            {errors.name && touched.name && <span className="text-sm text-red-700">{errors.name}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="text-base mb-1 block" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && touched.email && <span className="text-sm text-red-700">{errors.email}</span>}
          </div>

          {/* Password */}
          <div>
            <label className="text-base mb-1 block" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.password}
            />
            {errors.password && touched.password && <span className="text-sm text-red-700">{errors.password}</span>}
          </div>

          {/* Membership Type */}
          <div>
            <label className="text-base mb-1 block" htmlFor="membershipType">Membership Type</label>
            <select
              id="membershipType"
              name="membershipType"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.membershipType}
            >
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.membershipType && touched.membershipType && <span className="text-sm text-red-700">{errors.membershipType}</span>}
          </div>

          {/* Fine */}
          <div>
            <label className="text-base mb-1 block" htmlFor="fine">Fine</label>
            <input
              id="fine"
              name="fine"
              type="number"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.fine}
            />
            {errors.fine && touched.fine && <span className="text-sm text-red-700">{errors.fine}</span>}
          </div>

          {/* Status */}
          <div>
            <label className="text-base mb-1 block" htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.status}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && touched.status && <span className="text-sm text-red-700">{errors.status}</span>}
          </div>

          {/* Profile Image */}
          <div className="md:col-span-2">
            <label className="text-base mb-1 block" htmlFor="profileImage">Profile Image URL</label>
            <input
              id="profileImage"
              name="profileImage"
              type="url"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.profileImage}
            />
            {errors.profileImage && touched.profileImage && <span className="text-sm text-red-700">{errors.profileImage}</span>}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-between items-center mt-4">
            <a className="text-sm text-blue-500 underline cursor-pointer" onClick={() => navigate("/login")}>Already have an account?</a>
            <button
              className="w-32 h-10 bg-sky-500 text-base flex justify-center items-center gap-2 text-white rounded-sm px-4"
              type="submit"
            >
              <FaUserPlus /> {memberId ? 'Update' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
