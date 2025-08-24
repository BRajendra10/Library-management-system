import './App'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetachedBooksData } from './features/BookSlice'
import { fetchedMembersData } from './features/MemberSlice'
import { fetchOverdueData } from './features/overdueSlice'
import Dashboard from './screens/Dashboard'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetachedBooksData())
    dispatch(fetchedMembersData())
    dispatch(fetchOverdueData())
  }, [dispatch]);

  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default App
