import './App'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetachedBooksData } from './features/BookSlice'
import { fetchedMembersData } from './features/MemberSlice'
import { fetchOverdueData } from './features/overdueSlice'
import { loginUsersData } from './features/LoginSlice'
import Dashboard from './screens/Dashboard'
import { setIsLogedIn } from './features/LoginSlice'
import { fetchBorrowedBook } from './features/borrowedBooksSlice'
import { fetachedRequestBooksData } from './features/RequestBookSlice'
import { getDate } from './features/borrowedBooksSlice'
import { setAdmin } from './features/MemberSlice'

function App() {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.login)
  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetachedBooksData())
    dispatch(fetchedMembersData())
    dispatch(fetchOverdueData())
    dispatch(loginUsersData())
    dispatch(fetchBorrowedBook())
    dispatch(fetachedRequestBooksData())
    dispatch(getDate())
  }, [dispatch]);

  useEffect(() => {
    dispatch(setAdmin(members));
  },[dispatch, members])

  useEffect(() => {
    login?.forEach((el) => dispatch(setIsLogedIn({isLogedIn: true, data: el})));
  }, [dispatch, login])

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
