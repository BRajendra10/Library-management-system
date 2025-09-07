import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Overview from '../screens/Overview'
import Members from '../screens/Members'
import Login from '../screens/Login';
import Register from '../components/Register';
import BookForm from '../components/BookForm';
import LendBook from '../components/LendBook';
import ReturnBook from '../components/ReturnBook';
import MembersRoute from './MembersRoutes';
import BooksRoutes from './BooksRoutes';
import AuthRedirect from './AuthRedirect';
import ProtectedRoute from './ProtectedRoute';

function Navigation() {
    return (
        <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/books/*" element={<BooksRoutes />} />
            <Route path="/members/*" element={<MembersRoute />} />
            <Route path="/login" element={
                <AuthRedirect>
                    <Login />
                </AuthRedirect>
            } />
            <Route path="/register" element={
                <ProtectedRoute>
                    <Register />
                </ProtectedRoute>
            } />
            <Route path="/addbook" element={
                <ProtectedRoute>
                    <BookForm />
                </ProtectedRoute>
            } />
            <Route path="/lend" element={
                <ProtectedRoute>
                    <LendBook />
                </ProtectedRoute>
            } />
            <Route path="/return" element={
                <ProtectedRoute>
                    <ReturnBook />
                </ProtectedRoute>
            } />
        </Routes>
    )
}

export default Navigation