import './App'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetachedBooksData } from './features/BookSlice'
import { fetchedMembersData } from './features/MemberSlice'
import { fetchOverdueData } from './features/overdueSlice'
import Dashboard from './screens/Dashboard'
import { fetchBorrowedBook } from './features/borrowedBooksSlice'
import { fetachedRequestBooksData } from './features/RequestBookSlice'
import { getDate } from './features/borrowedBooksSlice'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetachedBooksData())
    dispatch(fetchedMembersData())
    dispatch(fetchOverdueData())
    dispatch(fetchBorrowedBook())
    dispatch(fetachedRequestBooksData())
    dispatch(getDate())
  }, [dispatch]);

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
