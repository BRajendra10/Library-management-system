import './App'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetachedBooksData, setOverdueBooks } from './features/BookSlice'
import { fetchedMembersData } from './features/MemberSlice'
import Dashboard from './screens/Dashboard'

function App() {
  const dispatch = useDispatch()
  const { books } = useSelector((state) => state.books)

  useEffect(() => {
    dispatch(fetachedBooksData())
    dispatch(fetchedMembersData())
  }, [dispatch]);

  useEffect(() => {
    dispatch(setOverdueBooks(books));
  }, [books, dispatch])
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default App
