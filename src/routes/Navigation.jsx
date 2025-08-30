import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Overview from '../screens/Overview'
import Members from '../screens/Members'
import Settings from '../screens/Settings'
import About from '../screens/About'
import HelpSupport from '../screens/HelpSupport'
import Login from '../components/Login';
import Register from '../components/Register';
import BookForm from '../components/BookForm';
import LendBook from '../components/LendBook';
import ReturnBook from '../components/ReturnBook';
import Students from '../components/Students';
import Admin from '../components/Admin';
import AllMembers from '../components/AllMembers';
import { Navigate } from 'react-router-dom';
import MembersRoute from './MembersRoutes';
import BooksRoutes from './BooksRoutes';

function Navigation() {
    return (
        <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/books/*" element={<BooksRoutes />} />
            <Route path="/members/*" element={<MembersRoute />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addbook" element={<BookForm />} />
            <Route path="/lend" element={<LendBook />} />
            <Route path="/return" element={<ReturnBook />} />
        </Routes>
    )
}

export default Navigation