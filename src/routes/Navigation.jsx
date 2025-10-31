import React from 'react'
import { Routes, Route } from 'react-router-dom';

import BookForm from '../components/BookForm';
import Register from '../components/Register';
import LendBook from '../components/LendBook';
import ReturnBook from '../components/ReturnBook';

import AuthRedirect from './AuthRedirect';
import ProtectedRoute from './ProtectedRoute';

import Overview from '../screens/Overview'
import Books from '../screens/Books';
import Members from '../screens/Members'
import Login from '../screens/Login';
import Description from '../components/Description';
import Settings from '../screens/Settings';
import Profile from '../components/Profile';

function Navigation() {
    return (
        <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/books" element={<Books />} />
            <Route path="/members" element={<Members />} />
            <Route path="/description" element={<Description />} />
            <Route path="/addbook" element={<BookForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={
                <AuthRedirect>
                    <Login />
                </AuthRedirect>
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