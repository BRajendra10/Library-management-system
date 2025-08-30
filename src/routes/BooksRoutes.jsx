import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Books from '../screens/Books'
import AllBooks from '../components/AllBooks';
import BorrowedBooks from '../components/BorrowedBooks';
import OverdueBooks from '../components/OverdueBooks';
import RequestedBooks from '../components/RequestedBooks';

export default function BooksRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Books />}>
            <Route index element={<AllBooks />} />
            <Route path="/borrowed" element={<BorrowedBooks />} />
            <Route path="/overdue" element={<OverdueBooks />} />
            <Route path="/requested" element={<RequestedBooks />} />
        </Route>
    </Routes>
  )
}