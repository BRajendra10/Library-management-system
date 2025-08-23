import './App'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetachedBooksData, setOverdueDetails } from './features/BookSlice'
import { fetchedMembersData } from './features/MemberSlice'
import Dashboard from './screens/Dashboard'

function App() {
  const dispatch = useDispatch()
  const { books, overdueDetails } = useSelector((state) => state.books);
  const { members } = useSelector((state) => state.members)

  useEffect(() => {
    dispatch(fetachedBooksData())
    dispatch(fetchedMembersData())
  }, [dispatch]);

  useEffect(() => {
    dispatch(setOverdueDetails({ books, members }));
  }, [dispatch, members, books])

  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default App
