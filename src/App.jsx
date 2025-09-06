import './App'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetachedBooksData } from './features/BookSlice'
import { fetchedMembersData } from './features/MemberSlice'
import { fetchOverdueData } from './features/overdueSlice'
import Dashboard from './screens/Dashboard'
import { fetchBorrowedBook } from './features/borrowedBooksSlice'
import { fetachedRequestBooksData } from './features/RequestBookSlice'
import { getDate } from './features/borrowedBooksSlice'
import { setAdmin } from './features/MemberSlice'

function App() {
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetachedBooksData())
    dispatch(fetchedMembersData())
    dispatch(fetchOverdueData())
    dispatch(fetchBorrowedBook())
    dispatch(fetachedRequestBooksData())
    dispatch(getDate())
  }, [dispatch]);

  useEffect(() => {
    const admin = members.filter((member) => member.membershipType === "admin") || [];

    dispatch(setAdmin(admin));
  }, [dispatch, members])

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
