import React from 'react'
import { Routes, Route } from 'react-router-dom';

import BookForm from '../components/BookForm';
import LendBook from '../components/LendBook';
import About from '../screens/About';

import AuthRedirect from './AuthRedirect';
import ProtectedRoute from './ProtectedRoute';

import Overview from '../screens/Overview'
import Books from '../screens/Books';
import Members from '../screens/Members'
import Login from '../screens/Login';
import Register from '../components/Register';


function Navigation() {
    return (
        <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/books" element={<Books />} />
            <Route path="/members" element={<Members />} />
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
                    <LendBook />
                </ProtectedRoute>
            } />
        </Routes>
    )
}

export default Navigation