import "./App";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetachedBooksData } from "./features/BookSlice";
import { fetchedMembersData } from "./features/MemberSlice";
import { fetchOverdueData } from "./features/overdueSlice";
import { loginUsersData } from "./features/LoginSlice";
import Dashboard from "./screens/Dashboard";
import { setIsLogedIn } from "./features/LoginSlice";
import { fetachedRequestBooksData } from "./features/RequestBookSlice";

function App() {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.login);
  const { requestbooks } = useSelector((state) => state.requestbooks);

  useEffect(() => {
    dispatch(fetachedBooksData());
    dispatch(fetchedMembersData());
    dispatch(fetchOverdueData());
    dispatch(loginUsersData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetachedRequestBooksData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIsLogedIn(login[0]?.isLogedIn));
  }, [dispatch, login]);

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
