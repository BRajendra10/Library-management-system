import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { FaUserPlus } from 'react-icons/fa6';
import { object, string, mixed, number } from 'yup'; // Added 'number' from Yup
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postMemberData, updateMemberData } from '../features/MemberSlice';
import { MemberContext } from '../context/editmemberContext';

const schema = object({
  name: string().required('Name is required'),
  email: string().required('Email is required').email('Invalid email format'),
  phone: string()
    .required('Phone number is required')
    .min(8, 'Phone number must be at least 8 digits'),
  department: string()
    .required('Department is required')
    .oneOf(['CSE', 'ECE', 'ME', 'IT', 'Mathematics', 'Administration'], 'Invalid department'),
  year: mixed()
    .when('membershipType', {
      is: 'student',
      then: () => string().required('Year is required').oneOf(['1st', '2nd', '3rd', '4th'], 'Invalid year'),
      otherwise: () => string().nullable(),
    }),
  membershipType: string()
    .required('Membership type is required')
    .oneOf(['student', 'admin'], 'Invalid membership type'),
  // password: string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  password: mixed().when('membershipType', {
    is: 'admin',
    then: () => string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    otherwise: () => string().nullable(),
  }),
  userImage: string().required('Image URL is required').url('Invalid URL format'),
  fineDue: number() // Added validation for fineDue
    .required('Fine amount is required')
    .min(0, 'Fine cannot be negative')
    .typeError('Fine must be a number'),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memberId, editedMember } = useContext(MemberContext);

  const formik = useFormik({
    initialValues: {
      name: editedMember?.name || '',
      email: editedMember?.email || '',
      phone: editedMember?.phone || '',
      department: editedMember?.department || '',
      year: editedMember?.year || '',
      fineDue: editedMember?.fineDue || 0, // Initialize with editedMember value or 0
      lastVisited: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-'),
      membershipType: editedMember?.membershipType || 'student',
      password: editedMember?.password || '',
      userImage: editedMember?.userImage || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(memberId){
        dispatch(updateMemberData({updatedMember: values, id: memberId}))
      }else{
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
        <h2 className="text-2xl text-center font-semibold mb-4">Register</h2>

        <form className="w-full grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
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

          <div>
            <label className="text-base mb-1 block" htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="+1-555-01XX"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.phone}
            />
            {errors.phone && touched.phone && <span className="text-sm text-red-700">{errors.phone}</span>}
          </div>

          <div>
            <label className="text-base mb-1 block" htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.department}
            >
              <option value="" disabled>Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
              <option value="IT">IT</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Administration">Administration</option>
            </select>
            {errors.department && touched.department && <span className="text-sm text-red-700">{errors.department}</span>}
          </div>

          <div>
            <label className="text-base mb-1 block" htmlFor="membershipType">Membership Type</label>
            <select
              id="membershipType"
              name="membershipType"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={(e) => {
                handleChange(e);
                if (e.target.value === 'admin') {
                  formik.setFieldValue('year', null);
                } else{
                  formik.setFieldValue('password', null);
                }
              }}
              value={values.membershipType}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            {errors.membershipType && touched.membershipType && <span className="text-sm text-red-700">{errors.membershipType}</span>}
          </div>

          <div>
            <label className="text-base mb-1 block" htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.year}
              disabled={values.membershipType === 'admin'}
            >
              <option value="" disabled>Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
            {errors.year && touched.year && <span className="text-sm text-red-700">{errors.year}</span>}
          </div>

          <div>
            <label className="text-base mb-1 block" htmlFor="fineDue">Fine Due</label>
            <input
              id="fineDue"
              name="fineDue"
              type="number"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.fineDue}
            />
            {errors.fineDue && touched.fineDue && <span className="text-sm text-red-700">{errors.fineDue}</span>}
          </div>

          <div>
            <label className="text-base mb-1 block" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.password}
              disabled={values.membershipType === 'student'}
            />
            {errors.password && touched.password && <span className="text-sm text-red-700">{errors.password}</span>}
          </div>

          <div className="md:col-span-2">
            <label className="text-base mb-1 block" htmlFor="userImage">User Image URL</label>
            <input
              id="userImage"
              name="userImage"
              type="url"
              className="w-full p-2 border border-stone-400 rounded-lg"
              onChange={handleChange}
              value={values.userImage}
            />
            {errors.userImage && touched.userImage && <span className="text-sm text-red-700">{errors.userImage}</span>}
          </div>

          <div className="md:col-span-2 flex justify-between items-center mt-4">
            <a className="text-sm text-center text-blue-400 underline" onClick={() => navigate("/login")}>Already have an account?</a>
            <button
              className="w-32 h-10 bg-sky-500 text-base flex justify-center items-center gap-2 text-white rounded-sm px-4"
              type="submit"
            >
              <FaUserPlus /> Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;