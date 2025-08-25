import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUsersData,
  postUsersData,
  removeUsersData,
} from "../features/LoginSlice";

const Login = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(loginUsersData());
  }, [dispatch]);

  const handleLoginUsersData = () => {
    const newUserData = {
      name: name,
      number: number,
      email: email,
      password: password,
    };
    dispatch(postUsersData(newUserData));
    setName(""), setEmail(""), setNumber(""), setPassword("");
  };

  return (
    <div>
      {/* <h1>{login.length}</h1> */}
      {/* <input
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={number}
        type="tel"
        onChange={(e) => setNumber(e.target.value)}
        placeholder="number"
      />
      <input
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={handleLoginUsersData}>Submit</button> */}

      {/* {login.map((el) => (
        <div key={el.id}>
          <h1>{el.name}</h1>
          <button onClick={() => dispatch(removeUsersData(el.id))}>
            Delete
          </button>
        </div>
      ))}
       */}
    </div>
  );
};

export default Login;


