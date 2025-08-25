import { useFormik } from 'formik';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { object, string } from 'yup';

const schema = object({
  email: string().required().email(),
  password: string().required().min(8),
})
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   loginUsersData,
//   postUsersData,
//   removeUsersData,
// } from "../features/LoginSlice";

const Login = () => {
  // const [name, setName] = useState("");
  // const [number, setNumber] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const dispatch = useDispatch();
  // const { login } = useSelector((state) => state.login);

  // useEffect(() => {
  //   dispatch(loginUsersData());
  // }, [dispatch]);

  // const handleLoginUsersData = () => {
  //   const newUserData = {
  //     name: name,
  //     number: number,
  //     email: email,
  //     password: password,
  //   };
  //   dispatch(postUsersData(newUserData));
  //   setName(""), setEmail(""), setNumber(""), setPassword("");
  // };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      console.log(values);
      formik.resetForm();
    },
  });

  const { errors, values, touched } = formik;

  return (
    <div className="w-full h-full flex justify-center items-center bg-stone-100">
      <div className="w-[30rem] min-h-[20rem] bg-white p-5 rounded-lg">
        <h2 className="text-3xl text-center font-semibold my-4">Sign in</h2>

        <form className="w-full h-fit flex flex-col" onSubmit={formik.handleSubmit}>
          <label className="text-lg my-2 outline-blue-400" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="p-2 border border-stone-400 rounded-lg"
            onChange={formik.handleChange}
            value={values.email}
          />
          {errors.email && touched.email && <span className="text-base text-red-700">{errors.email}</span>}

          <label className="text-lg my-2 outline-none focus:border-blue-400" htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="p-2 border border-stone-400 rounded-lg"
            onChange={formik.handleChange}
            value={values.password}
          />
          {errors.password && touched.password && <span className="text-base text-red-700">{errors.password}</span>}

          <div className="W-full flex justify-between items-center my-8">
            <a className="text-sm text-blue-400 underline" href="#">Forgot password?</a>
            <button className="w-30 h-10 bg-sky-500 text-base flex justify-around items-center gap-1 text-white rounded-sm p-2" type="submit"><FaArrowRightToBracket /> Login</button>
          </div>

          <span className="text-center text-sm text-stone-400">Don't have a account? <a className="text-blue-400 underline" href="#">Request access</a></span>
        </form>
      </div>
    </div>
  );
};

export default Login;


